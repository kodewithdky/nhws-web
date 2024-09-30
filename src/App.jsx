import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Private from "./routes/Private";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { updateSuccess } from "./redux/slices/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/pages/Home.jsx";
import Program from "./components/pages/Program.jsx";
import About from "./components/pages/About.jsx";
import Certificate from "./components/pages/Certificate.jsx";
import Contact from "./components/pages/Contact.jsx";
import VerifyEmail from "../utils/VerifyEmail.jsx";
import VolunteerForm from "./components/pages/VolunteerForm.jsx";
import SignIn from "./components/pages/SignIn.jsx";
import SignUp from "./components/pages/SignUp.jsx";
import Forgot from "./components/pages/Forgot.jsx";
import Account from "./components/pages/Account.jsx";
import Profile from "./components/pages/Profile.jsx";
import ChangePassword from "./components/pages/ChangePassword.jsx";
import AdminPrivate from "./routes/AdminPrivate.jsx";
import PrivateForm from "./routes/PrivateForm.jsx";
import Dashboard from "./components/admin/Dashboard.jsx";
import AllUser from "./components/admin/AllUser.jsx";
import AllVolunteer from "./components/admin/AllVolunteer.jsx";
import Inbox from "./components/admin/Inbox.jsx";
import Donations from "./components/admin/Donations.jsx";
import ManageProgram from "./components/admin/ManageProgram.jsx";
import AddProgram from "./components/admin/AddProgram.jsx";
import ManageTeam from "./components/admin/ManageTeam.jsx";
import AddTeam from "./components/admin/AddTeam.jsx";
import AllProgram from "./components/admin/AllProgram.jsx";
import AllTeam from "./components/admin/AllTeam.jsx";
import NotFound from "./components/pages/NotFound.jsx";
import Payment from "./components/pages/Payment.jsx";

function App() {
  const server = import.meta.env.VITE_SERVER;
  const { currentUser } = useSelector((state) => state.user);
  const refreshToken = currentUser?.data?.refreshToken;
  const dispatch = useDispatch();

  const getRefreshToken = async () => {
    const res = await axios.post(`${server}/auth/refresh-token`, {
      refreshToken,
    });
    if (res.data.success) {
      dispatch(updateSuccess(res.data));
    }
  };

  useEffect(() => {
    if (refreshToken) {
      getRefreshToken();
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/program" element={<Program />} />
        <Route path="/about" element={<About />} />
        <Route path="/certificates" element={<Certificate />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/verify-email/:id" element={<VerifyEmail />} />
        <Route path="/donate" element={<Payment />} />
        <Route path="/register-as-volunteer" element={<VolunteerForm />} />
        <Route element={<PrivateForm />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<Forgot />} />
        </Route>
        <Route element={<Private />}>
          <Route path="/account" element={<Account />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>
        <Route element={<AdminPrivate />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<AllUser />} />
          <Route path="/volunteers" element={<AllVolunteer />} />
          <Route path="/messages" element={<Inbox />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/manage-program" element={<ManageProgram />} />
          <Route path="/add-program" element={<AddProgram />} />
          <Route path="/manage-team" element={<ManageTeam />} />
          <Route path="/add-team" element={<AddTeam />} />
          <Route path="/programs" element={<AllProgram />} />
          <Route path="/teams" element={<AllTeam />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  );
}

export default App;
