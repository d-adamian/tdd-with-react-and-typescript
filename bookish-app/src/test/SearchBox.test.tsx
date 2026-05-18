import { render, screen } from "@testing-library/react";
import { vitest, describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { SearchBox } from "../BookList/SearchBox";

describe("SearchBox", () => {
  const renderAndType = async (term: string) => {
    const onSearch = vitest.fn();
    render(<SearchBox term="" onSearch={onSearch} />);

    const searchInput = screen.getByRole("textbox");
    await userEvent.type(searchInput, term);
    return onSearch;
  };

  it("should render search input", async () => {
    const onSearch = await renderAndType("domain");
    expect(onSearch).toHaveBeenCalled();
  });

  it("should trim empty string", async () => {
    const onSearch = await renderAndType("    ");
    expect(onSearch).not.toHaveBeenCalled();
  });
});
