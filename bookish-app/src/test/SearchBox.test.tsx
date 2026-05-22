import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { SearchBox } from "../BookList/SearchBox";
import { configureStore } from "@reduxjs/toolkit";
import bookListReducer from "../redux/bookListSlice";
import { Provider } from "react-redux";

describe("SearchBox", () => {
  it.each(["domain", "    "])(
    "should render search input",
    async (term: string) => {
      const mockStore = configureStore({
        reducer: {
          bookList: bookListReducer,
        },
      });

      render(
        <Provider store={mockStore}>
          <SearchBox />
        </Provider>
      );

      const searchInput = screen.getByRole("textbox");
      await userEvent.type(searchInput, term);

      const state = mockStore.getState();
      expect(state.bookList.term).toBe(term.trim());
    }
  );
});
