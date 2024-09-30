import Layout from "./layout/Layout";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Avatar, Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Dropdown } from "flowbite-react";
import { toast } from "react-toastify";
import LodingButton from "../../../utils/LodingButton";

const AllUser = () => {
  const server = import.meta.env.VITE_SERVER;
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [usersData, setUsersData] = useState();
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState(null);
  const [page, setPage] = useState(1);

  const onPageChange = async (page) => {
    setPage(page);
  };

  const getAllUsers = async () => {
    try {
      if (search != "") {
        const res = await axios.get(
          `${server}/admin/get-users?search=${search}`,
          {
            headers: {
              Authorization: `${currentUser.data.accessToken}`,
            },
          }
        );
        setUsersData(res.data);
      } else if (page != "") {
        const res = await axios.get(`${server}/admin/get-users?page=${page}`, {
          headers: {
            Authorization: `${currentUser.data.accessToken}`,
          },
        });
        setUsersData(res.data);
      } else {
        const res = await axios.get(`${server}/admin/get-users`, {
          headers: {
            Authorization: `${currentUser.data.accessToken}`,
          },
        });
        setUsersData(res.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    setUserId(id);
    try {
      const res = await axios.delete(`${server}/admin/delete-user/${id}`, {
        headers: {
          Authorization: `${currentUser.data.accessToken}`,
        },
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }
      setDeleteLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message);
      setDeleteLoading(false);
    }
    setDeleteLoading(false);
  };

  const handleAdmin = async (id) => {
    const value = 1;
    try {
      const res = await axios.put(
        `${server}/admin/change-privilage/${id}`,
        { value },
        {
          headers: {
            Authorization: `${currentUser.data.accessToken}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleUser = async (id) => {
    const value = 0;
    try {
      const res = await axios.put(
        `${server}/admin/change-privilage/${id}`,
        { value },
        {
          headers: {
            Authorization: `${currentUser.data.accessToken}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [search, page, deleteLoading]);

  return (
    <Layout>
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
                        Admin{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                      >
                        {" "}
                        Verified{" "}
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
                    {usersData?.data?.users.map((u) => (
                      <tr
                        key={u._id}
                        className="bg-white transition-all duration-500 hover:bg-gray-50"
                      >
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                          {" "}
                          <Avatar
                            img={u?.avatar?.url}
                            alt="avatar of Jese"
                            rounded
                          />
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                          {" "}
                          {u?.name}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {u?.email}{" "}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {u?.phone}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {u?.is_admin ? "Yes" : "No"}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {u?.is_verified ? "Yes" : "No"}
                        </td>
                        <td className=" p-5 ">
                          <div className="flex items-center gap-1">
                            <button className="p-2 rounded-full  group transition-all duration-500  flex item-center">
                              {deleteLoading && userId === u?._id ? (
                                <LodingButton content={""} btnClass={""} />
                              ) : (
                                <RiDeleteBin6Line
                                  color="red"
                                  onClick={() => handleDelete(u?._id)}
                                />
                              )}
                            </button>
                            <div className="p-2  rounded-full  group transition-all duration-500  flex item-center">
                              <Dropdown
                                label={<BiDotsVerticalRounded color="blue" />}
                                arrowIcon={false}
                                color={""}
                              >
                                <Dropdown.Item
                                  onClick={() => handleAdmin(u?._id)}
                                >
                                  Make Admin
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => handleUser(u?._id)}
                                >
                                  Make User
                                </Dropdown.Item>
                              </Dropdown>
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
            totalPages={usersData?.data?.totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AllUser;
