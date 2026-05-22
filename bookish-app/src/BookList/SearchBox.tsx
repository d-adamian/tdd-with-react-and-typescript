import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../redux/store";
import { fetchBooks, setTerm } from "../redux/bookListSlice";

export const SearchBox = () => {
  const term = useSelector((state: RootState) => state.bookList.term);
  const dispatch = useDispatch<AppDispatch>();

  const performSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value && value.trim().length === 0) {
      return;
    }
    dispatch(setTerm(value));
    void dispatch(fetchBooks(value));
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
