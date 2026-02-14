import { useSearchTermContext } from "../lib/hooks";

export default function SearchForm() {
  const { searchTerm, handleChangeSearch } = useSearchTermContext();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      action="#"
      className="search"
    >
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        onChange={(e) => {
          handleChangeSearch(e.target.value);
        }}
        value={searchTerm}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
