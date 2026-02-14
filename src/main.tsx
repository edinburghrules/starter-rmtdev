import "./index.css";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";

import App from "./components/App.tsx";
import ActiveIdContextProvider from "./contexts/ActiveIdContext.tsx";
import BookmarksContextProvider from "./contexts/BookmarksContext.tsx";
import JobItemsContextProvider from "./contexts/JobItemsContext.tsx";
import SearchTermContextProvider from "./contexts/SearchTermContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ActiveIdContextProvider>
        <BookmarksContextProvider>
          <SearchTermContextProvider>
            <JobItemsContextProvider>
              <App />
            </JobItemsContextProvider>
          </SearchTermContextProvider>
        </BookmarksContextProvider>
      </ActiveIdContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
