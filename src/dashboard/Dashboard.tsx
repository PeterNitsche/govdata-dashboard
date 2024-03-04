import { useQuery } from "@tanstack/react-query";
import { fetchMinistryDatasets } from "./Dashboard.queries";

export function Dashboard() {
  const { data, status } = useQuery({
    queryKey: ["ministryDatasets"],
    queryFn: fetchMinistryDatasets,
  });

  return (
    <>
      {status === "pending" && <p>Loading...</p>}
      {status === "error" && <p>Error while loading the data!</p>}
      <ul>
        {status === "success" &&
          data?.map((ministry) => (
            <li key={ministry.id}>{ministry.department}</li>
          ))}
      </ul>
    </>
  );
}
