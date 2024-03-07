import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC } from "react";
import { MinistryList } from "./Dashboard.queries";
import { QueryStatus } from "@tanstack/react-query";
import styles from "./DashboardTable.module.css";

interface DashboardTableProps {
  ministries?: MinistryList;
  loadingState: QueryStatus;
}
export const DashboardTable: FC<DashboardTableProps> = ({
  ministries,
  loadingState,
}) => {
  return (
    <div
      aria-live="assertive"
      aria-busy={loadingState === "pending"}
      className={styles.wrapper}
    >
      {loadingState === "pending" && <p>Loading...</p>}
      {loadingState === "error" && <p>Error while loading the data!</p>}
      {loadingState === "success" && (
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
            {ministries?.map((ministry) => (
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
    </div>
  );
};
