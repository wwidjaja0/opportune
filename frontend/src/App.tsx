import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { BrowserRouter } from "react-router-dom";
import Applications from "./pages/Applications";
import SavedApplications from "./pages/SavedApplications";
import Companies from "./pages/Companies";
import Connect from "./pages/Connect";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="companies" element={<Companies />} />
            <Route path="connect" element={<Connect />} />
            <Route path="applications">
              <Route path="applied" element={<Applications />} />
              <Route path="saved" element={<SavedApplications />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
