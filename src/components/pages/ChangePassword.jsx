import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassStart,
  changePassSuccess,
  changePassFailure,
} from "../../redux/slices/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import LodingButton from "../../../utils/LodingButton";

const ChangePassword = () => {
  const server = import.meta.env.VITE_SERVER;
  const [formData, setFormData] = useState({});
  const { currentUser, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(changePassStart());
      const res = await axios.put(`${server}/user/change-password`, formData, {
        headers: {
          Authorization: `${currentUser.data.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(changePassSuccess(res.data));
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(changePassFailure(error.response.data.message));
    }
  };

  return (
    <main className="relative">
      <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
        <div className="overflow-hidden rounded-lg bg-white">
          <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
            <form
              className="divide-y divide-gray-200 lg:col-span-9"
              onSubmit={handleSubmit}
            >
              <div className="py-6 px-4 sm:p-6 lg:pb-8">
                <div>
                  <h2 className="text-lg font-medium leading-6 text-gray-900">
                    Change Password
                  </h2>
                </div>
                <div className="mt-6 flex flex-col lg:flex-row">
                  <div className="flex-grow space-y-6">
                    <div>
                      <label
                        htmlFor="oldPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Old passwod
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="password"
                          name="oldPassword"
                          id="oldPassword"
                          className="block w-full min-w-0 min-h-8 flex-grow border border-gray-300 rounded-md outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm p-1"
                          placeholder="Old password"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        New Password
                      </label>
                      <div className="mt-1">
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          className="mt-1 block w-full rounded-md min-h-8 border border-gray-300 outline-none shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm p-1"
                          placeholder="New Password"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm Password
                      </label>
                      <div className="mt-1">
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          className="mt-1 block w-full rounded-md min-h-8 border border-gray-300 outline-none shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm p-1"
                          placeholder="Confirm Password"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-gray-200 pt-6">
                <div className="mt-4 flex justify-end py-4 px-4 sm:px-6">
                  {loading ? (
                    <LodingButton
                      content={"Loading..."}
                      btnClass={
                        "ml-5 inline-flex justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white shadow-sm"
                      }
                    />
                  ) : (
                    <button
                      type="submit"
                      className="ml-5 inline-flex justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white shadow-sm"
                    >
                      Change
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChangePassword;
