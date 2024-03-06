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

export function Dashboard() {
  const [filterQuery, setFilterQuery] = useState<string>("");

  const { data, status } = useQuery({
    queryKey: ["ministryDatasets", filterQuery],
    queryFn: fetchMinistryDatasets,
  });

  const onFilterInputChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFilterQuery(e.currentTarget.value);
  };

  return (
    <Stack direction={"column"} alignItems={"center"} spacing={2}>
      <Typography variant="h1">Dashboard</Typography>
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
        <Table aria-label="Available datasets by ministry">
          <TableHead>
            <TableRow>
              <TableCell align="right" width={200}>
                Datasets
              </TableCell>
              <TableCell>Ministry</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((ministry) => (
              <TableRow key={ministry.department}>
                <TableCell align="right">{ministry.datasets}</TableCell>
                <TableCell>{ministry.department}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Stack>
  );
}
