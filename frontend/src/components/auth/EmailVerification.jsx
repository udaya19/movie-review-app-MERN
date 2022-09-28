import React from "react";
import Title from "../form/Title";
import Submit from "../form/Submit";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyUserEmail } from "../../api/auth";
import { useToasts } from "react-toast-notifications";
const OTP_LENGTH = 5;
const isValidOtp = (otp) => {
  let valid = false;
  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }
  return valid;
};
const EmailVerification = () => {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const inputRef = useRef();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const user = state?.user;
  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1);
  };
  const focusPrevInputField = (index) => {
    let nextIndex;
    const diff = index - 1;
    nextIndex = diff !== 0 ? diff : 0;
    setActiveOtpIndex(nextIndex);
  };
  const handleOtpChange = ({ target }, index) => {
    const { value } = target;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1, value.length);
    if (!value) {
      focusPrevInputField(index);
    } else {
      focusNextInputField(index);
    }

    setOtp([...newOtp]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidOtp(otp)) {
      console.log("Invalid otp");
    }
    const { error, message } = await verifyUserEmail({
      OTP: otp.join(""),
      userId: user.id,
    });
    if (error) {
      console.log(console);
      return addToast(error, { appearance: "error" });
    }
    console.log("User:", user);
    console.log(message);
    addToast(message, { appearance: "success" });
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);
  useEffect(() => {
    if (!user) {
      navigate("/not-found");
    }
    console.log(user);
  }, [user]);
  return (
    <div className="fixed inset-0 dark:bg-primary bg-white text-white -z-10 flex justify-center items-center">
      <div className="max-w-screen-xl max-auto ">
        <form
          onSubmit={handleSubmit}
          action=""
          className="dark:bg-secondary bg-white drop-shadow-lg rounded p-6 space-y-6"
        >
          <div>
            <Title>Please enter the OTP</Title>
            <p className="text-center text-dark-subtle">
              OTP has been sent to your e-mail
            </p>
          </div>
          <div className="flex justify-center items-center space-x-4">
            {otp.map((_, index) => (
              <input
                ref={activeOtpIndex === index ? inputRef : null}
                value={otp[index] || ""}
                key={index}
                type="number"
                onChange={(e) => handleOtpChange(e, index)}
                className="outline-none w-12 h-12 rounded border-2 dark:border-dark-subtle dark:focus:border-white dark:bg-transparent border-primary focus:border-black text-center dark:text-white text-black"
              />
            ))}
          </div>
          <Submit value="Verify Account" />
        </form>
      </div>
    </div>
  );
};

export default EmailVerification;
