import { useCallback, useState } from "react";
import { fetchDatasetChartPayload } from "../api/genderStatisticsDatasetChart";
import { buildChartModelFromPayload } from "../utils/datasetChartData";

/**
 * @param {string} language - App language: "GE" | "EN"
 */
export function useGenderStatisticsDatasetChart(language) {
  const [selectedId, setSelectedId] = useState(null);
  const [chartModel, setChartModel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadDataset = useCallback(
    (datasetId) => {
      if (!datasetId) return;

      setSelectedId(datasetId);
      setLoading(true);
      setError(null);
      setChartModel(null);

      fetchDatasetChartPayload(datasetId, language)
        .then((payload) => {
          setChartModel(buildChartModelFromPayload(payload));
        })
        .catch((err) => {
          setError(err instanceof Error ? err : new Error(String(err)));
          setChartModel(null);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [language],
  );

  const clearDataset = useCallback(() => {
    setSelectedId(null);
    setChartModel(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    selectedId,
    chartModel,
    loading,
    error,
    loadDataset,
    clearDataset,
  };
}
