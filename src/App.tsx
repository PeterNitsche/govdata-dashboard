import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Dashboard } from "./dashboard/Dashboard";

const queryClient = new QueryClient();

import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

const theme = responsiveFontSizes(createTheme());

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <main>
          <Dashboard />
        </main>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
