import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import EventsPage from "./pages/EventsPage";
import CreateEvent from "./pages/CreateEvent";

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route path="/create" element={<CreateEvent />} />
      </Routes>
    </Router>
  );
}
