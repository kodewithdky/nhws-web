import Layout from "./layout/Layout";
import { BiSearch } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Avatar, Pagination, Button, Datepicker, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaImage } from "react-icons/fa";
import { toast } from "react-toastify";
import LodingButton from "../../../utils/LodingButton";

const AllVolunteer = () => {
  const server = import.meta.env.VITE_SERVER;
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [volunteerData, setVolunteerData] = useState();
  const [search, setSearch] = useState("");
  const [volunteerId, setVolunteerId] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [page, setPage] = useState(1);

  const [openModal, setOpenModal] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreiw, setAvatarPreiew] = useState(null);
  const [qualification, setQualification] = useState("");
  const [name, setName] = useState("");
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [skills, setSkills] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  //formate date
  let formatedDob = "";
  if (dob) {
    const date = new Date(dob);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    formatedDob = `${day}-${month}-${year}`;
  }

  //Image size
  const maxSize = 2 * 1024 * 1024;
  const minSize = 100 * 1024;

  const onPageChange = (page) => {
    setPage(page);
  };

  const getAllVolunteer = async () => {
    try {
      if (search !== "") {
        const res = await axios.get(
          `${server}/admin/get-volunteers?search=${search}`,
          {
            headers: {
              Authorization: `${currentUser.data.accessToken}`,
            },
          }
        );
        setVolunteerData(res.data);
      } else if (page != "") {
        const res = await axios.get(
          `${server}/admin/get-volunteers?page=${page}`,
          {
            headers: {
              Authorization: `${currentUser.data.accessToken}`,
            },
          }
        );
        setVolunteerData(res.data);
      } else {
        const res = await axios.get(`${server}/admin/get-volunteers`, {
          headers: {
            Authorization: `${currentUser.data.accessToken}`,
          },
        });
        setVolunteerData(res.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    setVolunteerId(id);
    try {
      const res = await axios.delete(`${server}/admin/delete-volunteer/${id}`, {
        headers: {
          Authorization: `${currentUser.data.accessToken}`,
        },
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }
      setDeleteLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setDeleteLoading(false);
    }
    setDeleteLoading(false);
  };

  const handelAvatar = (e) => {
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
        setAvatarPreiew(reader.result);
      };
    }
  };

  const handleDateChange = (date) => {
    setDob(date);
  };

  const setOpen = (id) => {
    setOpenModal(true);
    setUpdateId(id);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (avatarPreiw) {
      formData.append("avatar", avatar);
    }
    formData.append("qualification", qualification);
    formData.append("name", name);
    formData.append("fname", fname);
    formData.append("mname", mname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("gender", gender);
    formData.append("dob", formatedDob);
    formData.append("skills", skills);
    formData.append("address", address);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("pincode", pincode);
    setUpdateLoading(true);
    try {
      const res = await axios.put(
        `${server}/admin/update-volunteer-details/${updateId}`,
        formData,
        {
          headers: {
            Authorization: `${currentUser.data.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
      setUpdateLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setUpdateLoading(false);
    }
    setUpdateLoading(false);
  };

  useEffect(() => {
    getAllVolunteer();
  }, [search, page, deleteLoading, updateLoading]);

  return (
    <Layout>c
      <div className="absolute sm:left-[30%] mt-4">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block align-middle">
              <div className="relative  text-gray-500 focus-within:text-gray-900 mb-4">
                <div className="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none ">
                  <BiSearch />
                </div>
                <input
                  type="text"
                  id="default-search"
                  className="block w-80 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search user"
                />
              </div>
              <div className="overflow-hidden ">
                <table className=" min-w-full rounded-xl">
                  <thead>
                    <tr className="bg-gray-50">
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"
                      >
                        {" "}
                        Avatar{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"
                      >
                        {" "}
                        Name{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"
                      >
                        {" "}
                        DOB{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                      >
                        {" "}
                        F Name{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                      >
                        {" "}
                        M Name{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                      >
                        {" "}
                        Email{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                      >
                        {" "}
                        Phone{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                      >
                        {" "}
                        Qualifiction{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                      >
                        {" "}
                        Skills{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                      >
                        {" "}
                        Gender{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                      >
                        {" "}
                        Address{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                      >
                        {" "}
                        State{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                      >
                        {" "}
                        City{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                      >
                        {" "}
                        Pincode{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"
                      >
                        {" "}
                        Actions{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300 ">
                    {volunteerData?.data?.volunteer.map((v) => (
                      <tr
                        key={v?._id}
                        className="bg-white transition-all duration-500 hover:bg-gray-50"
                      >
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                          {" "}
                          <Avatar
                            img={v?.avatar?.url}
                            alt="avatar of Jese"
                            rounded
                          />
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                          {" "}
                          {v?.name}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                          {" "}
                          {v?.dob}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                          {" "}
                          {v?.fname}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {v?.mname}{" "}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {v?.email}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {v?.phone}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {v?.qualification}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {v?.skills}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {v?.gender}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {v?.address}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {v?.state}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {v?.city}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {v?.pincode}
                        </td>
                        <td className=" p-5 ">
                          <div className="flex items-center gap-1">
                            <div className="p-2  rounded-full  group transition-all duration-500  flex item-center">
                              {/* modal start */}
                              <Button
                                onClick={() => setOpen(v?._id)}
                                color={""}
                              >
                                <FiEdit color="blue" />
                              </Button>
                              <Modal
                                show={openModal}
                                size="5xl"
                                onClose={onCloseModal}
                                popup
                              >
                                <Modal.Header />
                                <Modal.Body>
                                  <form
                                    className="w-[90%] ml-6 sm:ml-8 md:ml-10 xl:ml-16 my-10"
                                    onSubmit={handleSubmit}
                                  >
                                    <div className="space-y-12">
                                      <div className="">
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                                          Upade Volunter
                                        </h2>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                          Fill and submit to update volunteer
                                          details.
                                        </p>
                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                          <div className="col-span-full">
                                            <label
                                              htmlFor="cover-photo"
                                              className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                              Profile photo
                                            </label>
                                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                              <div className="text-center">
                                                {avatarPreiw ? (
                                                  <img
                                                    className="mx-auto h-12 w-12 text-gray-300"
                                                    viewBox="0 0 24 24"
                                                    src={
                                                      avatarPreiw
                                                        ? `${avatarPreiw}`
                                                        : "/docHolder.jpg"
                                                    }
                                                    alt="svg"
                                                  />
                                                ) : (
                                                  <FaImage
                                                    aria-hidden="true"
                                                    className="mx-auto h-12 w-12 text-gray-300"
                                                  />
                                                )}
                                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                  <label
                                                    htmlFor="avatar"
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                  >
                                                    <span>Upload Photo</span>
                                                    <input
                                                      id="avatar"
                                                      name="avatar"
                                                      type="file"
                                                      className="sr-only"
                                                      onChange={handelAvatar}
                                                    />
                                                  </label>
                                                  <p className="pl-1">
                                                    {" "}
                                                    Passport Size
                                                  </p>
                                                </div>
                                                <p className="text-xs leading-5 text-gray-600">
                                                  PNG, JPG, JPEG OR WEBP, 100KB
                                                  to 2MB
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="border-b border-gray-900/10 pb-12">
                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                          <div className="sm:col-span-3">
                                            <label
                                              htmlFor="name"
                                              className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                              Full name
                                            </label>
                                            <div className="mt-2">
                                              <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                onChange={(e) =>
                                                  setName(e.target.value)
                                                }
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 px-1"
                                              />
                                            </div>
                                          </div>
                                          <div className="sm:col-span-3">
                                            <label
                                              htmlFor="qualification"
                                              className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                              Qualification
                                            </label>
                                            <div className="mt-2">
                                              <select
                                                id="qualification"
                                                name="qualification"
                                                onChange={(e) =>
                                                  setQualification(
                                                    e.target.value
                                                  )
                                                }
                                                autoComplete="qualification"
                                                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                              >
                                                <option value={""}>
                                                  ---Select Here---
                                                </option>
                                                <option value={"High School"}>
                                                  High School
                                                </option>
                                                <option value={"Inter Mediate"}>
                                                  Inter Mediate
                                                </option>
                                                <option value={"Graduate"}>
                                                  Graduate
                                                </option>
                                                <option value={"Post Graduate"}>
                                                  Post Graduate
                                                </option>
                                                <option value={"PhD"}>
                                                  PhD
                                                </option>
                                              </select>
                                            </div>
                                          </div>
                                          <div className="sm:col-span-3">
                                            <label
                                              htmlFor="fname"
                                              className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                              Father name
                                            </label>
                                            <div className="mt-2">
                                              <input
                                                id="fname"
                                                name="fname"
                                                onChange={(e) =>
                                                  setFname(e.target.value)
                                                }
                                                type="text"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 px-1"
                                              />
                                            </div>
                                          </div>
                                          <div className="sm:col-span-3">
                                            <label
                                              htmlFor="mname"
                                              className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                              Mother name
                                            </label>
                                            <div className="mt-2">
                                              <input
                                                id="mname"
                                                name="mname"
                                                onChange={(e) =>
                                                  setMname(e.target.value)
                                                }
                                                type="text"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 px-1"
                                              />
                                            </div>
                                          </div>
                                          <div className="sm:col-span-3">
                                            <label
                                              htmlFor="email"
                                              className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                              Email address
                                            </label>
                                            <div className="mt-2">
                                              <input
                                                id="email"
                                                name="email"
                                                onChange={(e) =>
                                                  setEmail(e.target.value)
                                                }
                                                type="email"
                                                autoComplete="email"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 px-1"
                                              />
                                            </div>
                                          </div>
                                          <div className="sm:col-span-3">
                                            <label
                                              htmlFor="phone"
                                              className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                              Mobile number
                                            </label>
                                            <div className="mt-2">
                                              <input
                                                id="phone"
                                                name="phone"
                                                onChange={(e) =>
                                                  setPhone(e.target.value)
                                                }
                                                type="text"
                                                autoComplete="phone"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 px-1"
                                              />
                                            </div>
                                          </div>

                                          <div className="sm:col-span-3">
                                            <label
                                              htmlFor="gender"
                                              className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                              Gender
                                            </label>
                                            <div className="mt-2">
                                              <select
                                                id="gender"
                                                name="gender"
                                                onChange={(e) =>
                                                  setGender(e.target.value)
                                                }
                                                autoComplete="gender"
                                                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                                              >
                                                <option value={""}>
                                                  ---Select Here---
                                                </option>
                                                <option value={"Male"}>
                                                  Male
                                                </option>
                                                <option value={"Female"}>
                                                  Female
                                                </option>
                                                <option value={"Other"}>
                                                  Other
                                                </option>
                                              </select>
                                            </div>
                                          </div>
                                          <div className="sm:col-span-3">
                                            <label
                                              htmlFor="dob"
                                              className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                              DOB
                                            </label>
                                            <div className="mt-2">
                                              <Datepicker
                                                onSelectedDateChanged={
                                                  handleDateChange
                                                }
                                              />
                                            </div>
                                          </div>
                                          <div className="col-span-full">
                                            <label
                                              htmlFor="skills"
                                              className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                              Skills
                                            </label>
                                            <div className="mt-2">
                                              <input
                                                id="skills"
                                                name="skills"
                                                onChange={(e) =>
                                                  setSkills(e.target.value)
                                                }
                                                type="text"
                                                autoComplete="skills"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 px-1"
                                              />
                                            </div>
                                          </div>
                                          <div className="col-span-full">
                                            <label
                                              htmlFor="address"
                                              className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                              Street address
                                            </label>
                                            <div className="mt-2">
                                              <input
                                                id="address"
                                                name="address"
                                                onChange={(e) =>
                                                  setAddress(e.target.value)
                                                }
                                                type="text"
                                                autoComplete="address"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 px-1"
                                              />
                                            </div>
                                          </div>
                                          <div className="sm:col-span-2 sm:col-start-1">
                                            <label
                                              htmlFor="city"
                                              className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                              City
                                            </label>
                                            <div className="mt-2">
                                              <input
                                                id="city"
                                                name="city"
                                                onChange={(e) =>
                                                  setCity(e.target.value)
                                                }
                                                type="text"
                                                autoComplete="address-level2"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 px-1"
                                              />
                                            </div>
                                          </div>
                                          <div className="sm:col-span-2">
                                            <label
                                              htmlFor="state"
                                              className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                              State / Province
                                            </label>
                                            <div className="mt-2">
                                              <input
                                                id="state"
                                                name="state"
                                                onChange={(e) =>
                                                  setState(e.target.value)
                                                }
                                                type="text"
                                                autoComplete="address-level1"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 px-1"
                                              />
                                            </div>
                                          </div>
                                          <div className="sm:col-span-2">
                                            <label
                                              htmlFor="pincode"
                                              className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                              ZIP / Postal code
                                            </label>
                                            <div className="mt-2">
                                              <input
                                                id="pincode"
                                                name="pincode"
                                                onChange={(e) =>
                                                  setPincode(e.target.value)
                                                }
                                                type="text"
                                                autoComplete="postal-code"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 px-1"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mt-6 flex items-center justify-end gap-x-6 mx-5">
                                      {updateLoading ? (
                                        <LodingButton
                                          content={"Loading..."}
                                          btnClass={
                                            "rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                          }
                                        />
                                      ) : (
                                        <button
                                          type="submit"
                                          className="rounded-md bg-indigo-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
                                        >
                                          Submit
                                        </button>
                                      )}
                                    </div>
                                  </form>
                                </Modal.Body>
                              </Modal>
                              {/* modal end */}
                            </div>
                            <div className="p-2 rounded-full  group transition-all duration-500  flex item-center">
                              {deleteLoading && volunteerId === v?._id ? (
                                <LodingButton content={""} btnClass={""} />
                              ) : (
                                <RiDeleteBin6Line
                                  color="red"
                                  onClick={() => handleDelete(v?._id)}
                                />
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex overflow-x-auto sm:justify-center justify-center">
          <Pagination
            layout="navigation"
            currentPage={page}
            totalPages={volunteerData?.data?.totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AllVolunteer;
