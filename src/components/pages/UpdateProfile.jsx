import {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../../redux/slices/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import LodingButton from "../../../utils/LodingButton";


const UpdateProfile = () => {
  const server = import.meta.env.VITE_SERVER;
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.user);

  const [name, setName] = useState(
    currentUser && currentUser?.data?.user?.name
  );
  const [email, setEmail] = useState(
    currentUser && currentUser?.data?.user?.email
  );
  const [phone, setPhone] = useState(
    currentUser && currentUser?.data?.user?.phone
  );
  const [gender, setGender] = useState(
    currentUser && currentUser?.data?.user?.gender
  );
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    currentUser && currentUser?.data?.user?.avatar?.url
  );

  //Image size
  const maxSize = 2 * 1024 * 1024;
  const minSize = 100 * 1024;

  const avatarHandler = (e) => {
    let file = e.target.files[0];
    if (file.size > maxSize || file.size < minSize) {
      toast.error("File size should be 100KB to 2MB!.");
      file = "";
    }
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setAvatarPreview(reader.result);
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (avatarPreview) {
      formData.append("avatar", avatar);
    }
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("gender", gender);
    try {
      dispatch(updateStart());
      const res = await axios.put(
        `${server}/user/update-acc-details`,
        formData,
        {
          headers: {
            Authorization: `${currentUser?.data?.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(updateSuccess(res.data));
      }
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(updateFailure(error.response.data.message));
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
                    Update Profile
                  </h2>
                </div>
                <div className="mt-6 flex flex-col lg:flex-row">
                  {/*  */}
                  <div className="flex-grow space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          autoComplete="name"
                          className="block w-full min-w-0 min-h-9 flex-grow border border-gray-300 rounded-md outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm px-1"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="email"
                          className="mt-1 block w-full rounded-md min-h-9 border border-gray-300 outline-none shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm px-1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-shrink-0 lg:flex-grow-0">
                    <div className="mt-1 lg:hidden">
                      <div className="flex justify-center">
                        <div className="inline-block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                          <img
                            className="h-full w-full rounded-full"
                            src={
                              avatarPreview
                                ? `${avatarPreview}`
                                : `https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg`
                            }
                            alt=""
                          />
                        </div>
                        <div className="ml-5 rounded-md">
                          <div className="group relative flex items-center justify-center rounded-md border py-2 px-3">
                            <label
                              htmlFor="avatar"
                              className="pointer-events-none relative text-sm font-medium leading-4 text-gray-700"
                            >
                              <span>Change</span>
                            </label>
                            <input
                              id="avatar"
                              name="user-photo"
                              type="file"
                              className="absolute h-full w-full cursor-pointer rounded-md opacity-0"
                              onChange={avatarHandler}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative hidden overflow-hidden rounded-full lg:block">
                      <img
                        className="relative h-40 w-40 rounded-full"
                        src={
                          avatarPreview
                            ? `${avatarPreview}`
                            : `https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg`
                        }
                        alt=""
                      />
                      <label
                        htmlFor="avatar"
                        className="absolute inset-0 flex h-full w-full items-center justify-center text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"
                      >
                        <span>Change</span>
                        <input
                          type="file"
                          id="avatar"
                          name="user-photo"
                          className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                          onChange={avatarHandler}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-12 gap-6">
                  <div className="col-span-12 sm:col-span-6">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone number
                    </label>
                    <input
                      type="phone"
                      name="phone"
                      id="phone"
                      value={phone === "undefined" ? "" : phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="phone"
                      className="mt-1 block w-full rounded-md border border-gray-300 outline-none py-2 px-1 focus:border-sky-500 focus:ring-sky-500 shadow-sm sm:text-sm"
                    />
                  </div>
                  <div className="col-span-12 sm:col-span-6">
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Gender
                    </label>
                    <input
                      type="text"
                      name="gender"
                      id="gender"
                      value={gender === "undefined" ? "" : gender}
                      onChange={(e) => setGender(e.target.value)}
                      autoComplete="gender"
                      className="mt-1 block w-full rounded-md border border-gray-300 outline-none py-2 px-1 focus:border-sky-500 focus:ring-sky-500 shadow-sm sm:text-sm"
                    />
                  </div>
                  <div className="col-span-12 sm:col-span-6">
                    <label
                      htmlFor="text"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Is Admin
                    </label>
                    <input
                      type="text"
                      name="text"
                      id="text"
                      value={currentUser?.data?.user?.is_admin ? "Yes" : "No"}
                      autoComplete="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 outline-none py-2 px-1 shadow-sm sm:text-sm cursor-not-allowed bg-gray-100"
                      readOnly
                    />
                  </div>
                  <div className="col-span-12 sm:col-span-6">
                    <label
                      htmlFor="text"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Is Verified
                    </label>
                    <input
                      type="text"
                      name="text"
                      id="text"
                      value={
                        currentUser?.data?.user?.is_verified ? "Yes" : "No"
                      }
                      autoComplete="text"
                      className="mt-1 block w-full rounded-md border border-gray-300 outline-none py-2 px-1 shadow-sm sm:text-sm cursor-not-allowed bg-gray-100"
                      readOnly
                    />
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
                      Save
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

export default UpdateProfile;
