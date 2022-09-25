import React from "react";
import FormInput from "../form/FormInput";
import Title from "../form/Title";
import Submit from "../form/Submit";
import CustomLink from "../CustomLink";
const SignUp = () => {
  return (
    <div className="fixed inset-0 bg-primary text-white -z-10 flex justify-center items-center">
      <div className="max-w-screen-xl max-auto ">
        <form action="" className="bg-secondary rounded p-6 w-72 space-y-6">
          <Title>Sign Up</Title>
          <FormInput
            label="Name"
            placeholder="Your name"
            name="name"
            type="text"
          />
          <FormInput
            label="Email"
            placeholder="example@gmail.com"
            name="email"
            type="email"
          />
          <FormInput
            label="Password"
            placeholder="******"
            name="password"
            type="password"
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
