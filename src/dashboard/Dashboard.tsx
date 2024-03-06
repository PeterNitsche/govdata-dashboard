import { useQuery } from "@tanstack/react-query";
import { fetchMinistryDatasets } from "./Dashboard.queries";
import { useState } from "react";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./Dashboard.module.css";
import { useDebounce } from "../utils/useDebounce";

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
      {status === "pending" && <p>Loading...</p>}
      {status === "error" && <p>Error while loading the data!</p>}
      {status === "success" && (
        <Table
          id="dashboardTable"
          aria-label="Number of available datasets by ministry"
        >
          <TableHead>
            <TableRow>
              <TableCell align="right" width={1}>
                Datasets
              </TableCell>
              <TableCell width={3}>Ministry</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((ministry) => (
              <TableRow
                key={ministry.department}
                data-test-id="ministry-record"
              >
                <TableCell align="right" data-test-id="ministry-datasets">
                  {ministry.datasets}
                </TableCell>
                <TableCell data-test-id="ministry-name">
                  {ministry.department}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Stack>
  );
}
