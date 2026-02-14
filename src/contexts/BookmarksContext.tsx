import { createContext } from "react";

import { useBookmarkedItems, useLocalStorage } from "../lib/hooks";
import { jobItemDetails } from "../lib/types";

export type BookmarksContextType = {
  bookmarkedIds: number[];
  handleToggleBookmark: (jobId: number) => void;
  bookMarkedJobItems: jobItemDetails[];
  isLoading: boolean;
};

export const BookmarksContext = createContext<BookmarksContextType | null>(null);

export default function BookmarksContextProvider({ children }: { children: React.ReactNode }) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>("bookmarkedIds", []);

  const { jobItems: bookMarkedJobItems, isLoading } = useBookmarkedItems(bookmarkedIds);

  function handleToggleBookmark(jobId: number) {
    if (bookmarkedIds.includes(jobId)) {
      setBookmarkedIds((prev) => prev.filter((id) => id !== jobId));
    } else {
      setBookmarkedIds((prev) => [...prev, jobId]);
    }
  }

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        handleToggleBookmark,
        bookMarkedJobItems,
        isLoading,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
