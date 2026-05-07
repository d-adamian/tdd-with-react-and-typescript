import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:5173";

test.describe("Bookish application", () => {
  test("Visits the bookish", async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.getByTestId("heading")).toHaveText("Bookish");
  });

  test("Show the book list", async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.getByTestId("book-list")).toBeAttached();
    const bookItems = await page.getByTestId("book-item").all();
    await expect(bookItems).toHaveLength(2);
    await expect(bookItems[0]).toHaveText("Refactoring");
    await expect(bookItems[1]).toHaveText("Domain-driven design");
  });
});
