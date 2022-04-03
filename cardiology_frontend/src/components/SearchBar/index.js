import React, { useState, useEffect, useRef } from "react";
// Image
import SearchIcon from "../../images/search-icon.svg";
import CleanInput from "../../images/cleanInputIcon.png";
// Styles
import { Wrapper, SearchInput, CleanButton, SearchImage, CleanIcon } from "./SearchBar.styles";

const SearchBar = ({ placeholder, setSearchTerm }) => {
  const [state, setState] = useState('');
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }

    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500)

    return () => clearTimeout(timer)
  }, [setSearchTerm, state])

  return (
    <Wrapper>
      <SearchInput
        type="text"
        placeholder={placeholder}
        onChange={event => setState(event.currentTarget.value)}
        value={state}
      />
      {/* <div className="searchIcon">
        <SearchImage src={SearchIcon} alt="Not-Found" />
      </div> */}
      <CleanButton onClick={() => setState('')}>
        <CleanIcon src={CleanInput} alt="Not-Found" />
      </CleanButton>
    </Wrapper>
  )
}

export default SearchBar;
