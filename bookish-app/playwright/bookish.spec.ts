import { test, expect } from "@playwright/test";
import axios from "axios";
import type { Page } from "@playwright/test";

const BASE_URL = "http://localhost:5173";
const STUB_SERVER_URL = "http://localhost:8079";

const booksUrl = `${STUB_SERVER_URL}/books`;

interface BookResponse {
  name: string;
  id: number;
}

const books: BookResponse[] = [
  { name: "Refactoring", id: 1 },
  { name: "Domain-driven design", id: 2 },
  { name: "Microservices", id: 3 },
];

const cleanupStubBooks = async () => {
  const cleanupUrl = `${booksUrl}?_cleanup=true`;
  await axios.delete(cleanupUrl);
};

const feedStubBooks = async () => {
  for (const book of books) {
    await axios.post(booksUrl, book, {
      headers: { "Content-Type": "application/json" },
    });
  }
};

const gotoApp = async (page: Page) => {
  await page.goto(BASE_URL);
};

const checkAppTitle = async (page: Page) => {
  await expect(page.getByTestId("heading")).toHaveText("Bookish");
};

const checkBookList = async (page: Page, expectedBookNames: string[]) => {
  await expect(page.getByTestId("book-list")).toBeAttached();
  await expect(page.getByTestId("book-item")).toHaveCount(
    expectedBookNames.length
  );
  const bookItems = await page.getByTestId("book-item").all();
  for (let i = 0; i < bookItems.length; i++) {
    await expect(bookItems[i]).toContainText(expectedBookNames[i]);
  }
};

test.beforeEach(async () => {
  await cleanupStubBooks();
  await feedStubBooks();
});

test.describe("Bookish application", () => {
  test("Visits the bookish", async ({ page }) => {
    await gotoApp(page);
    await checkAppTitle(page);
  });

  test("Show the book list", async ({ page }) => {
    await gotoApp(page);
    const bookNames = books.map((book) => book.name);
    await checkBookList(page, bookNames);
  });

  const gotoFirstBook = async (page: Page) => {
    await gotoApp(page);
    const bookItem = page.getByTestId("book-item").first();
    await expect(bookItem).toContainText("View Details");
    await bookItem.locator("a").click();
  };

  const checkBookDetail = async (page: Page, book: BookResponse) => {
    await page.waitForURL(`${BASE_URL}/books/${book.id}`);
    await expect(page.getByTestId("book-title")).toHaveText(book.name);
  };

  test("Goes to the detail page", async ({ page }) => {
    await gotoFirstBook(page);
    await checkBookDetail(page, books[0]);
  });

  test("Searches for a title", async ({ page }) => {
    await gotoApp(page);

    const bookNames = books.map((book) => book.name);
    await checkBookList(page, bookNames);

    const searchInput = page.getByTestId("search");
    await searchInput.fill("design");

    await checkBookList(page, ["Domain-driven design"]);
  });
});
