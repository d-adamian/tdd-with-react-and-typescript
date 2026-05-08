import { Typography } from "@mui/material";
import { BookListContainer } from "./BookListContainer";

export const App = () => {
  return (
    <>
      <Typography variant="h2" component="h2" data-testid="heading">
        Bookish
      </Typography>
      <BookListContainer />
    </>
  );
};
