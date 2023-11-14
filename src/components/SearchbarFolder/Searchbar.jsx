
import { StyledSearchForm, StyledSearchFormInput, StyledSearchFormButton, StyledSearchFormButtonLabel, StyledHeaderSearch,} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const inputValue = event.target.elements.searchInput.value;
    onSubmit(inputValue);
  };
  return (
    <StyledHeaderSearch>
      <StyledSearchForm onSubmit={handleSubmit}>
        <StyledSearchFormButton type="submit">
          <StyledSearchFormButtonLabel></StyledSearchFormButtonLabel>
        </StyledSearchFormButton>
        <StyledSearchFormInput
          name="searchInput"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </StyledSearchForm>
    </StyledHeaderSearch>
  );
};