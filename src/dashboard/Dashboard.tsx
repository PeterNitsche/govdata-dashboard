import { useQuery } from "@tanstack/react-query";
import { fetchMinistryDatasets } from "./Dashboard.queries";
import { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Stack,
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
      <List>
        {status === "success" &&
          data?.map((ministry) => (
            <ListItem key={ministry.department}>
              <Typography variant="h6" component={"p"}>
                {ministry.datasets}
              </Typography>
              <ListItemText
                primary={ministry.department}
                secondary={ministry.description}
              />
            </ListItem>
          ))}
      </List>
    </Stack>
  );
}
