import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Auth from "./pages/Auth";
import { Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import Engineer from "./pages/Engineer";
import Customer from "./pages/Customer";
import "bootstrap/dist/css/bootstrap.min.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/engineer" element={<Engineer />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
