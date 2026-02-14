import { forwardRef } from "react";
import { createPortal } from "react-dom";

import { useBookmarksContext } from "../lib/hooks";

import JobList from "./JobList";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { bookMarkedJobItems, isLoading } = useBookmarksContext();
  return createPortal(
    <div ref={ref} className="bookmarks-popover">
      <JobList jobItems={bookMarkedJobItems} isLoading={isLoading} />
    </div>,
    document.body,
  );
});

export default BookmarksPopover;
