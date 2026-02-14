import { createContext, useState } from "react";

import { useDebounce } from "../lib/hooks";

type SearchTermContextType = {
  searchTerm: string;
  debouncedSearchTerm: string;
  handleChangeSearch: (searchTerm: string) => void;
};

export const SearchTermContext = createContext<SearchTermContextType | null>(null);

export default function SearchTermContextProvider({ children }: { children: React.ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  function handleChangeSearch(searchTerm: string) {
    setSearchTerm(searchTerm);
  }

  return (
    <SearchTermContext.Provider
      value={{
        searchTerm,
        debouncedSearchTerm,
        handleChangeSearch,
      }}
    >
      {children}
    </SearchTermContext.Provider>
  );
}
