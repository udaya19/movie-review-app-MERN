import React, { useState, useEffect } from "react";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyPasswordResetToken } from "../../api/auth";
const ConfirmPassword = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  useEffect(() => {
    isValidToken();
  });

  const isValidToken = async () => {
    const { error, valid } = await verifyPasswordResetToken(token, id);
    if (error) {
      navigate("/forget-password");
      return console.log(error);
    }
    if (!valid) {
      setIsValid(false);
      setIsVerifying(false);
    }
    setIsValid(true);
    setIsVerifying(false);
  };
  if (isVerifying) {
    <div className="fixed inset-0 dark:bg-primary bg-white text-white -z-10 flex justify-center items-center">
      <div className="max-w-screen-xl max-auto ">
        <h1 className="dark:text-white text-black">
          Please wait we are verifying your token
        </h1>
      </div>
    </div>;
  }
  // if (!isValid) {
  //   return (
  //     <div className="fixed inset-0 dark:bg-primary bg-white text-white -z-10 flex justify-center items-center">
  //       <div className="max-w-screen-xl max-auto ">
  //         <h1 className="dark:text-white text-black">Invalid token</h1>
  //       </div>
  //     </div>
  //   );
  // }
  if (isValid) {
    return (
      <div className="fixed inset-0 dark:bg-primary bg-white text-white -z-10 flex justify-center items-center">
        <div className="max-w-screen-xl max-auto ">
          <h1 className="dark:text-white text-black">Token is valid</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 dark:bg-primary bg-white text-white -z-10 flex justify-center items-center">
      <div className="max-w-screen-xl max-auto ">
        <form
          action=""
          className="dark:bg-secondary bg-white drop-shadow-lg rounded p-6 w-96 space-y-6"
        >
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
