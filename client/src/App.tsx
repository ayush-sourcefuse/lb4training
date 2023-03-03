import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Roles from "./pages/roles";

function App() {
  const queryClient = new QueryClient();

  return (
    <Router>
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <Routes>
            {/* <Route path="/" exact component={Main} /> */}
            <Route path="/roles" element={<Roles />} />
          </Routes>
        </QueryClientProvider>
      </div>
    </Router>
  );
}

export default App;
