import { Box } from "@mui/material";
import { FilterBar } from "./components/FilterBar/FilterBar";
import UsersList from "./components/UsersList/UsersList";
import "./styles.css";

export default function App() {
  return (
    <Box
      className="App"
      textAlign="initial"
      display="flex"
      flexDirection="column"
      gap={1}
    >
      <FilterBar />
      <UsersList />
    </Box>
  );
}
