import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BookDetail } from "../BookDetail/BookDetail";
import type { Book } from "../types";
import { Provider } from "react-redux";
import { store } from "../redux/store";

const BOOK: Book = {
  id: 1,
  name: "Refactoring",
  description:
    "Martin Fowler's Refactoring defined core ideas andtechniques " +
    "that hundreds of thousands of developers have used to improve " +
    "their software.",
};

const renderWithProvider = (component: React.ReactElement) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
};

describe("BookDetail", () => {
  it("should render book title", () => {
    renderWithProvider(<BookDetail book={BOOK} />);
    const title = screen.getByRole("heading");
    expect(title).toHaveTextContent(BOOK.name);
  });

  it("should render book description", () => {
    renderWithProvider(<BookDetail book={BOOK} />);
    expect(screen.getByText(BOOK.description || "")).toBeInTheDocument();
  });

  it("should display book name when no description is provided", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { description: _unused, ...book } = BOOK;
    renderWithProvider(<BookDetail book={book} />);
    expect(screen.getByTestId("book-description")).toHaveTextContent(book.name);
  });

  it("should render book reviews", () => {
    const reviews = [
      {
        id: 1,
        bookId: 1,
        name: "Juntao Qiu",
        date: "2023/06/01",
        content: "Excellent work, really impressed by your efforts",
      },
    ];
    const book = { ...BOOK, reviews };
    renderWithProvider(<BookDetail book={book} />);
    const reviewElements = screen.getAllByTestId("review");
    expect(reviewElements.length).toBe(1);
    expect(reviewElements[0]).toHaveTextContent(reviews[0].content);
  });

  it("should render review form", () => {
    renderWithProvider(<BookDetail book={BOOK} />);
    const nameInput = screen.getByTestId("review-name");
    expect(nameInput).toBeInTheDocument();

    const contentInput = screen.getByTestId("review-content");
    expect(contentInput).toBeInTheDocument();

    const button = screen.getByTestId("review-submit");
    expect(button).toBeInTheDocument();
  });
});
