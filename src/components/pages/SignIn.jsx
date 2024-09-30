import { Link, useNavigate } from "react-router-dom";
import { FloatingLabel } from "flowbite-react";
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/slices/userSlice";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../layout/Layout";
import LodingButton from "../../../utils/LodingButton";

const SignIn = () => {
  const server = import.meta.env.VITE_SERVER;
  const [formData, setFormData] = useState({});
  const { loading } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields!"));
    }
    try {
      dispatch(signInStart());
      const res = await axios.post(`${server}/auth/sign-in`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(signInSuccess(res.data));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(signInFailure(error.response.data.message));
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center px-4 mt-4">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-blue-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Don&apos;t have an account?{" "}
            <Link
              to="/sign-up"
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Create an account
            </Link>
          </p>
          <form className="mt-2" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2">
                  <FloatingLabel
                    type="email"
                    variant="outlined"
                    label="Email"
                    id="email"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-black hover:underline"
                  >
                    {" "}
                    Forgot password?{" "}
                  </Link>
                </div>
                <div className="mt-2">
                  <FloatingLabel
                    type="password"
                    variant="outlined"
                    label="Password"
                    id="password"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                {loading ? (
                  <LodingButton
                    content={"Loding..."}
                    btnClass={
                      "inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    }
                  />
                ) : (
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </form>
          <div className="mt-3 space-y-3">
            <button
              type="button"
              className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
            >
              <span className="mr-2 inline-block">
                <FaGoogle color="red" />
              </span>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
