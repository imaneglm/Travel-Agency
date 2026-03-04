import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar";
import CustomerHome from "./pages/customerhome";
import OurTrips  from "./pages/ourtrips";
import Aboutus from "./pages/aboutus";
import Footer from "./component/footer";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CustomerHome />} />
        <Route path="/our-trips" element={<OurTrips />} />
        <Route path="/trip/:id" element={<OurTrips />} />
        <Route path="/about" element={<Aboutus />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;