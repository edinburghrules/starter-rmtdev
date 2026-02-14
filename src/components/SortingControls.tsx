import useJobItemsContext from "../lib/hooks";

export default function SortingControls() {
  const { sortBy, handleChangeSort } = useJobItemsContext();
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButton onClick={() => handleChangeSort("relevance")} isActive={sortBy === "relevance"}>
        Relevant
      </SortingButton>
      <SortingButton onClick={() => handleChangeSort("recent")} isActive={sortBy === "recent"}>
        Recent
      </SortingButton>
    </section>
  );
}

type SortingButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  isActive?: boolean;
};

function SortingButton({ onClick, children, isActive }: SortingButtonProps) {
  return (
    <button className={`sorting__button ${isActive ? "sorting__button--active" : ""}`} onClick={onClick}>
      {children}
    </button>
  );
}
