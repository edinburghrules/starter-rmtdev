import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

import useJobItemsContext from "../lib/hooks";
import { Direction } from "../lib/types";

export default function Pagination() {
  const { currentPage, totalPages, handleChangePage } = useJobItemsContext();
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton direction="prev" currentPage={currentPage} onClick={() => handleChangePage("prev")} />
      )}
      {currentPage < totalPages && (
        <PaginationButton direction="next" currentPage={currentPage} onClick={() => handleChangePage("next")} />
      )}
    </section>
  );
}

type PaginationButtonProps = {
  direction: Direction;
  currentPage: number;
  onClick: () => void;
};

function PaginationButton({ direction, currentPage, onClick }: PaginationButtonProps) {
  return (
    <button
      className={`pagination__button pagination__button--${direction}`}
      onClick={(e) => {
        onClick();
        e.currentTarget.blur();
      }}
    >
      {direction === "prev" && (
        <>
          <ArrowLeftIcon /> Page {currentPage - 1}
        </>
      )}
      {direction === "next" && (
        <>
          <ArrowRightIcon /> Page {currentPage + 1}
        </>
      )}
    </button>
  );
}
