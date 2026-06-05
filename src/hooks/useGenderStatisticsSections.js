import { useEffect, useState } from "react";
import { fetchGenderStatisticsSections } from "../api/genderStatisticsCategories";

let cachedSections = null;
let cachePromise = null;

/**
 * Loads gender statistics sections once and shares the result across components.
 * @returns {{ sections: import("../api/genderStatisticsCategories").GenderStatisticsSection[], sectionIds: string[], loading: boolean, error: Error | null }}
 */
export function useGenderStatisticsSections() {
  const [sections, setSections] = useState(cachedSections ?? []);
  const [loading, setLoading] = useState(!cachedSections);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cachedSections) return;

    if (!cachePromise) {
      cachePromise = fetchGenderStatisticsSections()
        .then((data) => {
          cachedSections = data;
          return data;
        })
        .catch((err) => {
          cachePromise = null;
          throw err;
        });
    }

    cachePromise
      .then((data) => {
        setSections(data);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error(String(err)));
        setSections([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return {
    sections,
    sectionIds: sections.map((s) => s.id),
    loading,
    error,
  };
}
