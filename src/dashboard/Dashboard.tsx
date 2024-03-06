import { useQuery } from "@tanstack/react-query";
import { fetchMinistryDatasets } from "./Dashboard.queries";
import { useState } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import styles from "./Dashboard.module.css";
import { useDebounce } from "../utils/useDebounce";
import { DashboardTable } from "./DashboardTable";

export function Dashboard() {
  const [filterQuery, setFilterQuery] = useState<string>("");
  const debouncedFilterQuery = useDebounce(filterQuery, 300);

  const { data, status } = useQuery({
    queryKey: ["ministryDatasets", debouncedFilterQuery],
    queryFn: fetchMinistryDatasets,
  });

  const onFilterInputChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFilterQuery(e.currentTarget.value);
  };

  return (
    <Stack direction={"column"} alignItems={"center"} spacing={2}>
      <Typography variant="h1" id="dashboardTitle">
        Dashboard
      </Typography>
      <TextField
        id="dashboardSearchInput"
        label="Search"
        type="search"
        value={filterQuery}
        onChange={onFilterInputChange}
        className={styles.searchInput}
      />
      <DashboardTable loadingState={status} ministries={data} />
    </Stack>
  );
}
