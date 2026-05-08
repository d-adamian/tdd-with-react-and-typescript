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
  await axios.delete(cleanupUrl);

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
    expect(bookItems).toHaveLength(3);
    await expect(bookItems[0]).toContainText("Refactoring");
    await expect(bookItems[1]).toContainText("Domain-driven design");
    await expect(bookItems[2]).toContainText("Microservices");
  });

  test("Goes to the detail page", async ({ page }) => {
    await page.goto(BASE_URL);
    const bookItem = page.getByTestId("book-item").first();
    await expect(bookItem).toContainText("View Details");
    await bookItem.locator("a").click();
    await page.waitForURL(`${BASE_URL}/books/1`);
    const bookTitle = page.getByTestId("book-title");
    await expect(bookTitle).toHaveText("Refactoring");
  });
});
