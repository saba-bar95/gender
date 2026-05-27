import { useEffect, useState } from "react";
import { fetchGenderStatisticsDatasets } from "../api/genderStatisticsDatasets";

/**
 * Fetches datasets for a statistics subcategory. Pair with `key={sectionId}` on the
 * parent so loading resets when the section changes without sync setState in the effect.
 *
 * @param {string | undefined} sectionId
 * @param {string} language - App language: "GE" | "EN"
 */
export function useGenderStatisticsDatasets(sectionId, language) {
  const [byGroup, setByGroup] = useState(null);
  const [datasets, setDatasets] = useState([]);
  const [subcategoryName, setSubcategoryName] = useState("");
  const [loading, setLoading] = useState(Boolean(sectionId));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sectionId) return;

    let cancelled = false;

    fetchGenderStatisticsDatasets(sectionId, language)
      .then((result) => {
        if (cancelled) return;
        setByGroup(result.byGroup);
        setDatasets(result.datasets);
        setSubcategoryName(result.subcategoryName);
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error(String(err)));
        setByGroup(null);
        setDatasets([]);
        setSubcategoryName("");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [sectionId, language]);

  return { byGroup, datasets, subcategoryName, loading, error };
}
