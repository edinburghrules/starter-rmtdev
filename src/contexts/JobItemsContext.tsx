import { createContext, useCallback, useMemo, useState } from "react";

import { RESULTS_PER_PAGE } from "../lib/constants";
import { useSearchQuery, useSearchTermContext } from "../lib/hooks";
import { Direction, JobItem, SortBy } from "../lib/types";

type JobItemsContextType = {
  isLoading: boolean;
  sortedAndSlicedJobItems: JobItem[];
  count: number;
  currentPage: number;
  totalPages: number;
  sortBy: SortBy;
  handleChangePage: (direction: Direction) => void;
  handleChangeSort: (newSortBy: SortBy) => void;
};

export const JobItemsContext = createContext<JobItemsContextType | null>(null);

export default function JobItemsContextProvider({ children }: { children: React.ReactNode }) {
  const { debouncedSearchTerm } = useSearchTermContext();
  const { isLoading, jobItems } = useSearchQuery(debouncedSearchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevance");

  const count = jobItems?.length ?? 0;
  const totalPages = Math.ceil(count / RESULTS_PER_PAGE);
  const jobItemsSorted = useMemo(() => {
    return [...(jobItems || [])].sort((a, b) => {
      if (sortBy === "relevance") {
        return b.relevanceScore - a.relevanceScore;
      } else {
        return a.daysAgo - b.daysAgo;
      }
    });
  }, [jobItems, sortBy]);

  const sortedAndSlicedJobItems = useMemo(
    () => jobItemsSorted?.slice((currentPage - 1) * RESULTS_PER_PAGE, currentPage * RESULTS_PER_PAGE),
    [currentPage, jobItemsSorted],
  );

  const handleChangePage = useCallback((direction: Direction) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage((prev) => Math.max(1, prev - 1));
    }
  }, []);

  const handleChangeSort = useCallback((newSortBy: SortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  }, []);

  const contextValue = useMemo(
    () => ({
      isLoading,
      sortedAndSlicedJobItems,
      count,
      currentPage,
      totalPages,
      sortBy,
      handleChangePage,
      handleChangeSort,
    }),
    [isLoading, sortedAndSlicedJobItems, count, currentPage, totalPages, sortBy, handleChangePage, handleChangeSort],
  );

  return <JobItemsContext.Provider value={contextValue}>{children}</JobItemsContext.Provider>;
}
