import React, { useState, useEffect } from "react";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyPasswordResetToken, resetPassword } from "../../api/auth";
const ConfirmPassword = () => {
  const [password, setPassword] = useState({
    one: "",
    two: "",
  });
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
      navigate("/forget-password", { replace: true });
      return console.log(error);
    }
    if (!valid) {
      setIsValid(false);
      setIsVerifying(false);
    }
    setIsValid(true);
    setIsVerifying(false);
  };
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPassword({ ...password, [name]: value });
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
  if (!isValid) {
    return (
      <div className="fixed inset-0 dark:bg-primary bg-white text-white -z-10 flex justify-center items-center">
        <div className="max-w-screen-xl max-auto ">
          <h1 className="dark:text-white text-black">Invalid token</h1>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.one !== password.two) {
      console.log("Password and confirm password must be equal");
    }
    if (!password.one) {
      console.log("Password is required");
    }
    if (!password.two) {
      console.log("Confirm Password is required");
    }
    if (password.one.length < 8) {
      console.log("Password must be 8 characters long");
    }
    const { error, message } = await resetPassword({
      newPassword: password.one,
      userId: id,
    });
    if (error) {
      return console.log(error);
    }
    console.log(message);
    navigate("/signin", { replace: true });
  };
  return (
    <div className="fixed inset-0 dark:bg-primary bg-white text-white -z-10 flex justify-center items-center">
      <div className="max-w-screen-xl max-auto ">
        <form
          onSubmit={handleSubmit}
          action=""
          className="dark:bg-secondary bg-white drop-shadow-lg rounded p-6 w-96 space-y-6"
        >
          <Title>Enter new password</Title>
          <FormInput
            onChange={handleChange}
            value={password.one}
            label="Enter new password"
            placeholder="*****"
            name="one"
            type="password"
          />
          <FormInput
            onChange={handleChange}
            value={password.two}
            label="Confirm new password"
            placeholder="*****"
            name="two"
            type="password"
          />
          <Submit value="Change Password" />
        </form>
      </div>
    </div>
  );
};

export default ConfirmPassword;
