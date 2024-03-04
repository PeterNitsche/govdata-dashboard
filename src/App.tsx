import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Dashboard } from "./dashboard/Dashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <h1>Dashboard</h1>
        <button>Start</button>
        <Dashboard />
      </main>
    </QueryClientProvider>
  );
}

export default App;
