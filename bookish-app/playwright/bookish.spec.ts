import { test, expect } from "@playwright/test";

test.describe("Bookish application", () => {
  test("Visits the bookish", async ({ page }) => {
    await page.goto("http://localhost:5173");
    await expect(page.getByTestId("heading")).toHaveText("Bookish");
  });
});
