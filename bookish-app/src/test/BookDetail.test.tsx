import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BookDetail } from "../BookDetail/BookDetail";
import type { Book } from "../types";

const BOOK: Book = {
  id: 1,
  name: "Refactoring",
  description:
    "Martin Fowler's Refactoring defined core ideas andtechniques " +
    "that hundreds of thousands of developers have used to improve " +
    "their software.",
};

describe("BookDetail", () => {
  it("should render book title", () => {
    render(<BookDetail book={BOOK} />);
    const title = screen.getByRole("heading");
    expect(title).toHaveTextContent(BOOK.name);
  });

  it("should render book description", () => {
    render(<BookDetail book={BOOK} />);
    expect(screen.getByText(BOOK.description || "")).toBeInTheDocument();
  });

  it("should display book name when no description is provided", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { description: _unused, ...book } = BOOK;
    render(<BookDetail book={book} />);
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
    render(<BookDetail book={book} />);
    const reviewElements = screen.getAllByTestId("review");
    expect(reviewElements.length).toBe(1);
    expect(reviewElements[0]).toHaveTextContent(reviews[0].content);
  });

  it("should render review form", () => {
    render(<BookDetail book={BOOK} />);
    const nameInput = screen.getByTestId("name");
    expect(nameInput).toBeInTheDocument();

    const contentInput = screen.getByTestId("content");
    expect(contentInput).toBeInTheDocument();

    const button = screen.getByTestId("submit");
    expect(button).toBeInTheDocument();
  });
});
