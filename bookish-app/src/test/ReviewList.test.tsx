import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ReviewList } from "../ReviewList/ReviewList";
import { type Review } from "../types";

const REVIEWS: Review[] = [
  {
    id: 1,
    bookId: 1,
    name: "Juntao Qiu",
    date: "2023/06/01",
    content: "Excellent work, really impressed by your efforts",
  },
  {
    id: 2,
    bookId: 1,
    name: "Abruzzi Kim",
    date: "2023/06/22",
    content: "What a great book",
  },
];

describe("ReviewList", () => {
  it("renders review list", () => {
    render(<ReviewList reviews={REVIEWS} />);
    expect(screen.getByTestId("reviews-container")).toBeInTheDocument();
  });

  it("renders review list items", () => {
    render(<ReviewList reviews={REVIEWS} />);
    const items = screen.getAllByTestId("review");
    expect(items.length).toBe(2);
  });
});
