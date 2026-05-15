import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BookDetail } from "../BookDetail";
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
});
