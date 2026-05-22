import { describe, it, expect } from "vitest";
import { setTerm } from "../redux/bookListSlice";
import bookListReducer from "../redux/bookListSlice";

describe("bookListReducer", () => {
  const initialState = {
    term: "",
    books: [],
    loading: false,
    error: false,
  };

  it("should handle setTerm action", () => {
    const action = setTerm("Refactoring");
    const newState = bookListReducer(initialState, action);
    expect(newState.term).toEqual("Refactoring");
  });
});
