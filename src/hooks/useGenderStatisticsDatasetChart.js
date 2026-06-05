import { useCallback, useRef, useState, startTransition } from "react";
import {
  fetchDatasetData,
  fetchDatasetMetadata,
} from "../api/genderStatisticsDatasetChart";
import { buildChartModelFromPayload } from "../utils/datasetChartData";
import {
  getChartFilterVariables,
  getDefaultFilterSelections,
} from "../utils/datasetFilters";

/**
 * @param {string} language - App language: "GE" | "EN"
 */
export function useGenderStatisticsDatasetChart(language) {
  const [selectedId, setSelectedId] = useState(null);
  const [chartModel, setChartModel] = useState(null);
  const [chartFilters, setChartFilters] = useState([]);
  const [filterSelections, setFilterSelections] = useState({});
  const [loading, setLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [error, setError] = useState(null);
  const metadataRef = useRef(null);
  const filterVariablesRef = useRef([]);
  const filterSelectionsRef = useRef({});

  const loadChartWithFilters = useCallback(
    async (datasetId, selections) => {
      const data = await fetchDatasetData(
        datasetId,
        language,
        filterVariablesRef.current,
        selections,
      );
      return buildChartModelFromPayload({
        data,
        metadata: metadataRef.current,
      });
    },
    [language],
  );

  const loadDataset = useCallback(
    async (datasetId) => {
      if (!datasetId) return;

      setSelectedId(datasetId);
      setLoading(true);
      setError(null);
      setChartModel(null);
      setChartFilters([]);
      setFilterSelections({});
      filterVariablesRef.current = [];
      filterSelectionsRef.current = {};

      try {
        const metadata = await fetchDatasetMetadata(datasetId, language);
        metadataRef.current = metadata;

        const variables = metadata?.metadata?.variables ?? [];
        const filters = getChartFilterVariables(variables);
        const defaults = getDefaultFilterSelections(filters);

        filterVariablesRef.current = filters;
        filterSelectionsRef.current = defaults;
        setChartFilters(filters);
        setFilterSelections(defaults);

        const model = await loadChartWithFilters(datasetId, defaults);
        setChartModel(model);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setChartModel(null);
        metadataRef.current = null;
      } finally {
        setLoading(false);
      }
    },
    [language, loadChartWithFilters],
  );

  const updateFilter = useCallback(
    async (code, value) => {
      if (!selectedId) return;

      const nextSelections = {
        ...filterSelectionsRef.current,
        [code]: value,
      };
      filterSelectionsRef.current = nextSelections;
      setFilterSelections(nextSelections);

      setFilterLoading(true);
      setError(null);

      try {
        const model = await loadChartWithFilters(selectedId, nextSelections);
        startTransition(() => {
          setChartModel(model);
          setFilterLoading(false);
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setChartModel(null);
        setFilterLoading(false);
      }
    },
    [selectedId, loadChartWithFilters],
  );

  const clearDataset = useCallback(() => {
    setSelectedId(null);
    setChartModel(null);
    setChartFilters([]);
    setFilterSelections({});
    setError(null);
    setLoading(false);
    metadataRef.current = null;
    filterVariablesRef.current = [];
    filterSelectionsRef.current = {};
  }, []);

  return {
    selectedId,
    chartModel,
    chartFilters,
    filterSelections,
    loading,
    filterLoading,
    error,
    loadDataset,
    updateFilter,
    clearDataset,
  };
}
