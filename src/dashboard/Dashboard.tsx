import { useQuery } from "@tanstack/react-query";
import { fetchMinistryDatasets } from "./Dashboard.queries";
import { useState } from "react";

export function Dashboard() {
  const [filterQuery, setFilterQuery] = useState<string>("");

  const { data, status } = useQuery({
    queryKey: ["ministryDatasets", filterQuery],
    queryFn: fetchMinistryDatasets,
  });

  const onFilterInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFilterQuery(e.currentTarget.value);
  };

  return (
    <>
      <label htmlFor="dashboardSearchInput">Search</label>
      <input
        id="dashboardSearchInput"
        type="text"
        value={filterQuery}
        onChange={onFilterInputChange}
      />
      {status === "pending" && <p>Loading...</p>}
      {status === "error" && <p>Error while loading the data!</p>}
      <ul>
        {status === "success" &&
          data?.map((ministry) => (
            <li key={ministry.department}>
              {ministry.department}: {ministry.datasets}
            </li>
          ))}
      </ul>
    </>
  );
}
