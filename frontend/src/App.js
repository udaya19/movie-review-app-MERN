import "./App.css";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Navbar from "./components/user/Navbar";
import { Routes, Route } from "react-router-dom";
import EmailVerification from "./components/auth/EmailVerification";
import ForgetPassword from "./components/auth/ForgetPassword";
import ConfirmPassword from "./components/auth/ConfirmPassword";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import { useAuth } from "./hooks";
import AdminNavigator from "./navigator/AdminNavigator";
function App() {
  const { authInfo } = useAuth();
  console.log(authInfo);
  const isAdmin = authInfo.profile?.role === "admin";
  console.log(isAdmin);
  if (isAdmin) {
    return <AdminNavigator />;
  }
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verification" element={<EmailVerification />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ConfirmPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
