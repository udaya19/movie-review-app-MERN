import React, { useState, useEffect } from "react";
import FormInput from "../form/FormInput";
import Title from "../form/Title";
import Submit from "../form/Submit";
import CustomLink from "../CustomLink";
import { useNavigate } from "react-router-dom";
import { useAuth, useTheme } from "../../hooks/index";
const SignIn = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const { handleLogin, authInfo } = useAuth();
  const { isPending, isLoggedIn } = authInfo;
  console.log(authInfo);
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(userInfo.email, userInfo.password);
  };
  const theme = useTheme();
  const navigate = useNavigate();
  console.log(theme);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);
  return (
    <div className="fixed inset-0 dark:bg-primary bg-white text-white -z-10 flex justify-center items-center">
      <div className="max-w-screen-xl max-auto ">
        <form
          onSubmit={handleSubmit}
          action=""
          className="dark:bg-secondary rounded p-6 w-72 space-y-6 bg-white drop-shadow-lg"
        >
          <Title>Sign In</Title>
          <FormInput
            value={userInfo.email}
            onChange={handleChange}
            label="Email"
            placeholder="example@gmail.com"
            name="email"
            type="text"
          />
          <FormInput
            value={userInfo.password}
            onChange={handleChange}
            label="Password"
            placeholder="******"
            name="password"
            type="password"
          />
          <Submit value="SignIn" busy={isPending} />
          <div className="flex justify-between">
            <CustomLink
              to="/forget-password"
              className="text-dark-subtle hover:text-white transition"
              children="Forgot password"
            />

            <CustomLink to="/signup" children="SignUp" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
