import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "../src/index.css";
import { AdminLayout } from "./components/layouts/Admin-Layouts";
import Navbar from "./components/Navbar";
import { AdminFoods } from "./pages/Admin-Foods";
import { AdminUpdate } from "./pages/Admin-Update";
import { AdminUsers } from "./pages/Admin-Users";
import Adminlogin from "./pages/Adminlogin";
import Error from "./pages/Error";
import Home from "./pages/Home";
import { Logout } from "./pages/Logout";
import RegisterAtlas from "./pages/RegisterAtlas";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/RegisterAtlas" element={<RegisterAtlas />} />
          <Route path="/Adminlogin" element={<Adminlogin />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<AdminUsers />} />
            <Route path="foods" element={<AdminFoods />} />
            <Route path="users/update/:id" element={<AdminUpdate />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
