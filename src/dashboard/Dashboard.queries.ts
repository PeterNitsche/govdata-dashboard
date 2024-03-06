import { QueryFunctionContext } from "@tanstack/react-query";
import { z } from "zod";

const MinistryDatasetSchema = z.object({
  department: z.string().min(1),
  description: z.string(),
  datasets: z.number(),
});

const MinistryDatasetsSchema = z.array(MinistryDatasetSchema);

export async function fetchMinistryDatasets({
  queryKey,
}: QueryFunctionContext) {
  const filterQuery =
    typeof queryKey[1] === "string" ? `&department_like=${queryKey[1]}` : "";
  const response = await fetch(
    `http://localhost:3000/departments?_sort=-datasets${filterQuery}`
  );
  if (!response.ok) {
    throw new Error(`Network request returned with ${response.status}`);
  }
  return MinistryDatasetsSchema.parse(await response.json());
}
