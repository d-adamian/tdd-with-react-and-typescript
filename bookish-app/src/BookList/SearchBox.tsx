import { TextField } from "@mui/material";

interface SearchBoxProps {
  term: string;
  onSearch: (term: string) => void;
}

export const SearchBox = ({ term, onSearch }: SearchBoxProps) => {
  const performSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value && value.trim().length === 0) {
      return;
    }
    onSearch(value);
  };

  return (
    <TextField
      label="Search"
      value={term}
      onChange={performSearch}
      margin="normal"
      variant="outlined"
      slotProps={{
        htmlInput: {
          "data-testid": "search",
        },
      }}
    />
  );
};
