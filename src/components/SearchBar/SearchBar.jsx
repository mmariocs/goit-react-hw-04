import { useState } from "react";
import toast from "react-hot-toast";
import s from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [input, setInput] = useState("");
  const handleChange = (event) => {
    setInput(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.trim() === "") {
      toast.error("Please enter a search term.");
      return;
    }
    onSubmit(input);
    setInput("");
  };
  return (
    <header className={s.header}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Search images and photos"
          className={s.input}
        />
        <button type="submit" className={s.btn}>
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
