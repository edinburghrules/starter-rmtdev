import { useContext, useEffect, useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";

import { ActiveIdContext } from "../contexts/ActiveIdContext";
import { BookmarksContext } from "../contexts/BookmarksContext";
import { JobItemsContext } from "../contexts/JobItemsContext";
import { SearchTermContext } from "../contexts/SearchTermContext";

import { BASE_API_URL } from "./constants";
import { JobItemDetailsApiResponse, JobItemsApiResponse } from "./types";
import { handleError } from "./utils";

export function useOnClickOutside(refs: React.RefObject<HTMLElement>[], callBack: () => void) {
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (e.target instanceof HTMLElement && refs.every((ref) => !ref.current?.contains(e.target as Node))) {
        callBack();
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [refs, callBack]);
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue)));

  useEffect(() => {
    localStorage.setItem("bookmarkedIds", JSON.stringify(value));
  }, [value]);

  return [value, setValue] as const;
}

export function useDebounce<T>(value: T, delay = 250): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

async function fetchJobItems(debouncedSearchTerm: string): Promise<JobItemsApiResponse> {
  const response = await fetch(`${BASE_API_URL}?search=${debouncedSearchTerm}`);

  if (!response.ok) {
    if (response.status === 404) {
      const error = await response.json();
      throw new Error(error?.description);
    } else {
      const error = await response.json();
      throw new Error(error?.description);
    }
  }

  const data = await response.json();

  return data;
}

export function useSearchQuery(searchTerm: string) {
  const { data, isInitialLoading } = useQuery(["jobItems", searchTerm], () => fetchJobItems(searchTerm), {
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(searchTerm),
    onError: handleError,
  });

  const jobItems = data?.jobItems;

  return { isLoading: isInitialLoading, jobItems };
}

async function fetchJobDetails(id: number): Promise<JobItemDetailsApiResponse> {
  const response = await fetch(`${BASE_API_URL}/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      const error = await response.json();
      throw new Error(error?.description);
    } else {
      const error = await response.json();
      throw new Error(error?.description);
    }
  }

  const data = await response.json();

  return data;
}

export function useJobDetails(id: number | null) {
  const { data, isInitialLoading } = useQuery(["jobItemDetails", id], () => (id ? fetchJobDetails(id) : null), {
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(id),
    onError: handleError,
  });

  return { isLoading: isInitialLoading, jobItem: data?.jobItem };
}

// --------------------------------------------------------------------------------------------------------------

export function useSearchTermContext() {
  const context = useContext(SearchTermContext);

  if (!context) {
    throw new Error("useActiveIdContext must be used within a SearchTermContextProvider");
  }

  return context;
}

export default function useJobItemsContext() {
  const context = useContext(JobItemsContext);

  if (!context) {
    throw new Error("useActiveIdContext must be used within a JobItemsContextProvider");
  }

  return context;
}

export function useActiveIdContext() {
  const context = useContext(ActiveIdContext);

  if (!context) {
    throw new Error("useActiveIdContext must be used within a ActiveIdContextProvider");
  }

  return context;
}

export function useBookmarksContext() {
  const context = useContext(BookmarksContext);

  if (!context) {
    throw new Error("useBookmarksContext must be used within a BookmarksContextProvider");
  }

  return context;
}

export function useBookmarkedItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => {
      return {
        queryKey: ["job-item", id],
        queryFn: () => fetchJobDetails(id),
        staleTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: Boolean(id),
        onError: handleError,
      };
    }),
  });

  const jobItems = results.map((result) => result.data?.jobItem).filter((jobItem) => jobItem !== undefined);
  const isLoading = results.some((result) => result.isLoading === true);

  return { jobItems, isLoading };
}
