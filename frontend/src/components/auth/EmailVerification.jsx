import React from "react";
import Title from "../form/Title";
import Submit from "../form/Submit";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
const OTP_LENGTH = 6;
const EmailVerification = () => {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const inputRef = useRef();
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
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);
  return (
    <div className="fixed inset-0 bg-primary text-white -z-10 flex justify-center items-center">
      <div className="max-w-screen-xl max-auto ">
        <form action="" className="bg-secondary rounded p-6 space-y-6">
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
                className="outline-none w-12 h-12 rounded border-2 border-dark-subtle focus:border-white bg-transparent text-center"
              />
            ))}
          </div>
          <Submit value="Send Link" />
        </form>
      </div>
    </div>
  );
};

export default EmailVerification;
