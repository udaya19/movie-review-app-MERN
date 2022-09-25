import React from "react";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
const ConfirmPassword = () => {
  return (
    <div className="fixed inset-0 bg-primary text-white -z-10 flex justify-center items-center">
      <div className="max-w-screen-xl max-auto ">
        <form action="" className="bg-secondary rounded p-6 w-96 space-y-6">
          <Title>Enter new password</Title>
          <FormInput
            label="Enter new password"
            placeholder="*****"
            name="password"
            type="password"
          />
          <FormInput
            label="Confirm new password"
            placeholder="*****"
            name="confirmPassword"
            type="password"
          />
          <Submit value="Change Password" />
        </form>
      </div>
    </div>
  );
};

export default ConfirmPassword;
