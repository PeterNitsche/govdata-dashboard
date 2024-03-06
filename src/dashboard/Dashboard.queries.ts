import { z } from "zod";

const MinistryDatasetSchema = z.object({
  id: z.string().min(1),
  department: z.string().min(1),
  description: z.string(),
  datasets: z.number(),
});

const MinistryDatasetsSchema = z.array(MinistryDatasetSchema);

export async function fetchMinistryDatasets() {
  const response = await fetch(
    "http://localhost:3000/departments?_sort=-datasets"
  );
  if (!response.ok) {
    throw new Error(`Network request returned with ${response.status}`);
  }
  return MinistryDatasetsSchema.parse(await response.json());
}
