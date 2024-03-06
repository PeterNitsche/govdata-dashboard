import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Dashboard } from "./Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, FC } from "react";
import { ministryDatasetsMocks } from "./Dashboard.queries";

const queryClient = new QueryClient();
const QueryWrapper: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("Dashboard", () => {
  const fetchMock = vi.fn();
  beforeEach(() => {
    vi.spyOn(global, "fetch").mockImplementation(fetchMock);
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(ministryDatasetsMocks),
    } as Response);
  });

  it("renders the Dashboard page", async () => {
    render(<Dashboard />, { wrapper: QueryWrapper });
    const heading = screen.getByRole("heading", { name: "Dashboard" });
    const searchInput = screen.getByRole("searchbox", { name: "Search" });
    const table = await screen.findByRole("table", {
      name: "Number of available datasets by ministry",
    });

    expect(heading).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(table).toBeInTheDocument();
  });

  it("shows the datasets of each ministry in a table", async () => {
    render(<Dashboard />, { wrapper: QueryWrapper });

    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:3000/departments?_sort=-datasets&department_like=",
    );

    const headers = await screen.findAllByRole("columnheader");
    expect(headers[0]).toHaveTextContent("Datasets");
    expect(headers[1]).toHaveTextContent("Ministry");

    const cells = screen.getAllByRole("cell");
    expect(cells[0]).toHaveTextContent(ministryDatasetsMocks[0].datasets + "");
    expect(cells[1]).toHaveTextContent(ministryDatasetsMocks[0].department);
    expect(cells[2]).toHaveTextContent(ministryDatasetsMocks[1].datasets + "");
    expect(cells[3]).toHaveTextContent(
      ministryDatasetsMocks[1].department + "",
    );
  });
});
