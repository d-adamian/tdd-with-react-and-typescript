import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { BookList } from "../BookList/BookList.tsx";

const BOOKS = [
  {
    id: 1,
    name: "Refactoring",
  },
  {
    id: 2,
    name: "Domain-driven design",
  },
];

const renderWithRouter = (component: React.ReactElement) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe("BookList", () => {
  it("should render books", async () => {
    renderWithRouter(<BookList books={BOOKS} />);

    const headings = await screen.findAllByRole("heading");
    expect(headings).toHaveLength(BOOKS.length);
    for (let i = 0; i < BOOKS.length; i++) {
      expect(headings[i]).toHaveTextContent(BOOKS[i].name);
    }
  });
});
