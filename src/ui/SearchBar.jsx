import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const SearchContainer = styled.div`
  display: flex;
  width: 600px;
  max-width: 100%;
  margin-top: 10px;
`;

const SearchInput = styled.input`
  border-radius: 3px;
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  padding: 13px;

`;

const Button = styled.button`
    background-color: #20bc74;
    width: 50px;
    border-radius: 4px;
  border: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #16a085;
  }
`;

const SearchIcon = styled.div`
  margin-right: 8px;
  color: white;
  padding: 15px;
`;

const SearchBar = () => {
  return (
    <SearchContainer>
      <SearchInput type="text" placeholder="Search for services..." />
      <Button>
      <SearchIcon>
        <FaSearch />
      </SearchIcon>
      </Button>
    </SearchContainer>
  );
};

export default SearchBar;
