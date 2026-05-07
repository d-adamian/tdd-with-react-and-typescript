import { Typography } from "@mui/material";
import { BookList } from "./BookList";

export const App = () => {
  const books = [{ name: "Refactoring" }, { name: "Domain-driven design" }];
  return (
    <>
      <Typography variant="h2" component="h2" data-testid="heading">
        Bookish
      </Typography>
      <BookList books={books} />
    </>
  );
};
