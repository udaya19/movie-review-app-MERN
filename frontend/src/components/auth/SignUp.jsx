import React, { useState } from "react";
import FormInput from "../form/FormInput";
import Title from "../form/Title";
import Submit from "../form/Submit";
import CustomLink from "../CustomLink";
import { createUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
const validateUserInfo = ({ name, email, password }) => {
  const isValidEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!name.trim()) {
    return { ok: false, error: "Name is missing" };
  }
  if (!email.trim()) {
    return { ok: false, error: "Email is missing" };
  }
  if (!isValidEmail.test(email)) {
    return { ok: false, error: "Email is invalid" };
  }
  if (!password.trim()) {
    return { ok: false, error: "Password is missing" };
  }
  if (password.length < 8) {
    return { ok: false, error: "Password must be 8 characters long" };
  }
  return { ok: true };
};
const SignUp = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = userInfo;
  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) {
      return console.log(error);
    }
    console.log(userInfo);
    const response = await createUser(userInfo);
    if (response.error) {
      return console.log(error);
    }
    console.log(response.user);
    navigate("/verification", {
      state: { user: response.user },
      replace: true,
    });
  };
  return (
    <div className="fixed inset-0 dark:bg-primary bg-white text-white -z-10 flex justify-center items-center">
      <div className="max-w-screen-xl max-auto ">
        <form
          onSubmit={handleSubmit}
          action=""
          className="dark:bg-secondary bg-white drop-shadow-lg rounded p-6 w-72 space-y-6"
        >
          <Title>Sign Up</Title>
          <FormInput
            onChange={handleChange}
            label="Name"
            placeholder="Your name"
            name="name"
            type="text"
            value={name}
          />
          <FormInput
            onChange={handleChange}
            label="Email"
            placeholder="example@gmail.com"
            name="email"
            type="email"
            value={email}
          />
          <FormInput
            onChange={handleChange}
            label="Password"
            placeholder="******"
            name="password"
            type="password"
            value={password}
          />
          <Submit value="SignUp" />
          <div className="flex justify-between">
            <CustomLink to="/forget-password" children="Forgot password" />
            <CustomLink to="/signin" children="SignIn" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
