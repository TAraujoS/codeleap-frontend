import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route
          path="/home"
          element={<ProtectedRoute>{/* <Home /> */}</ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
