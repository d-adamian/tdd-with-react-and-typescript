import React from "react";
import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { App } from "../App";
import { MemoryRouter } from "react-router-dom";

const customRender = (component: React.ReactNode) => {
  return {
    ...render(
      <Provider store={store}>
        <MemoryRouter>{component}</MemoryRouter>
      </Provider>
    ),
  };
};

it("Renders bookish", () => {
  customRender(<App />);
  const heading = screen.getByText("Bookish");
  expect(heading).toBeInTheDocument();
});
