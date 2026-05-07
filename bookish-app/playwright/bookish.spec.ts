import { test, expect } from "@playwright/test";
import axios from "axios";

const BASE_URL = "http://localhost:5173";
const STUB_SERVER_URL = "http://localhost:8079";

interface BookResponse {
  name: string;
  id: number;
}

const books: BookResponse[] = [
  { name: "Refactoring", id: 1 },
  { name: "Domain-driven design", id: 2 },
  { name: "Microservices", id: 3 },
];

test.beforeEach(async () => {
  const booksUrl = `${STUB_SERVER_URL}/books`;
  const cleanupUrl = `${booksUrl}?_cleanup=true`;
  await axios.delete(cleanupUrl).catch((err) => err);

  for (const book of books) {
    await axios.post(booksUrl, book, {
      headers: { "Content-Type": "application/json" },
    });
  }
});

test.describe("Bookish application", () => {
  test("Visits the bookish", async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.getByTestId("heading")).toHaveText("Bookish");
  });

  test("Show the book list", async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.getByTestId("book-list")).toBeAttached();
    const bookItems = await page.getByTestId("book-item").all();
    await expect(bookItems).toHaveLength(3);
    await expect(bookItems[0]).toHaveText("Refactoring");
    await expect(bookItems[1]).toHaveText("Domain-driven design");
    await expect(bookItems[2]).toHaveText("Microservices");
  });
});
