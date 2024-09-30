import { useState } from "react";
import { FloatingLabel } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../layout/Layout";
import LodingButton from "../../../utils/LodingButton";

const Forgot = () => {
  const server = import.meta.env.VITE_SERVER;
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenrate = async (e) => {
    e.preventDefault();
    setOtpLoading(true);
    try {
      const res = await axios.post(`${server}/auth/send-otp`, { email });
      if (res.data.success) {
        toast.success(res.data?.message);
      }
      setOtpLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message);
      setOtpLoading(false);
    }
    setOtpLoading(false);
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    try {
      const res = await axios.post(`${server}/auth/forgot-password`, {
        otp,
        password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/sign-in");
      }
      setResetLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setResetLoading(false);
    }
    setResetLoading(false);
  };

  return (
    <Layout
      title={"Namaskar Humanity Welfare Society -Contact"}
      description={
        "We would love to hear from you at Namaskar Humanity Welfare Society!"
      }
      keywords={"help, educate, donate, welfare society"}
    >
      <div className="flex items-center justify-center px-4 mt-4 mb-6">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-blue-900">
            Forgot your password
          </h2>
          <form onSubmit={handleGenrate} className="mt-6">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2">
                  <FloatingLabel
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    label="Email"
                    autoComplete="email"
                  />
                </div>
                <div>
                  {otpLoading ? (
                    <LodingButton
                      content={"Loading..."}
                      btnClass={"bg-green-600 rounded-3xl text-white p-[3px]"}
                    />
                  ) : (
                    <button
                      type="submit"
                      className="bg-green-600 rounded-3xl text-white text-sm p-[4px]"
                    >
                      Genrate otp
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
          <form onSubmit={handleForgot} className="mt-6">
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    OTP{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <FloatingLabel
                    type="text"
                    onChange={(e) => setOtp(e.target.value)}
                    variant="outlined"
                    label="OTP"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    New password{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <FloatingLabel
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    label="New Password"
                  />
                </div>
              </div>
              <div>
                {resetLoading ? (
                  <LodingButton
                    content={"Loading..."}
                    btnClass={
                      "inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 mt-3"
                    }
                  />
                ) : (
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 mt-3"
                  >
                    Reset Password
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Forgot;
