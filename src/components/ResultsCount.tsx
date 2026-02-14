import useJobItemsContext from "../lib/hooks";

export default function ResultsCount() {
  const { count } = useJobItemsContext();
  return (
    <p className="count">
      <span className="u-bold">{count}</span> results
    </p>
  );
}
