import React from "react";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import CustomLink from "../CustomLink";

const ForgetPassword = () => {
  return (
    <div className="fixed inset-0 dark:bg-primary bg-white text-white -z-10 flex justify-center items-center">
      <div className="max-w-screen-xl max-auto ">
        <form
          action=""
          className="dark:bg-secondary bg-white drop-shadow-lg rounded p-6 w-96 space-y-6"
        >
          <Title>Please Enter Your E-mail</Title>
          <FormInput
            label="Email"
            placeholder="example@gmail.com"
            name="email"
            type="text"
          />

          <Submit value="Send Link" />
          <div className="flex justify-between">
            <CustomLink to="/signin" children="SignIn" />

            <CustomLink to="/signup" children="SignUp" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
