import Layout from "./layout/Layout";
import { BiSearch } from "react-icons/bi";
import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const Donations = () => {
  const server = import.meta.env.VITE_SERVER;
  const { currentUser } = useSelector((state) => state.user);
  const [donations, setDonations] = useState();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  console.log("donations: ", donations);

  const onPageChange = async (page) => {
    setPage(page);
  };
  const getAllDonations = async () => {
    try {
      if (search != "") {
        const res = await axios.get(
          `${server}/admin/get-payments?search=${search}`,
          {
            headers: {
              Authorization: `${currentUser.data.accessToken}`,
            },
          }
        );
        setDonations(res.data);
      } else if (page != "") {
        const res = await axios.get(
          `${server}/admin/get-payments?page=${page}`,
          {
            headers: {
              Authorization: `${currentUser.data.accessToken}`,
            },
          }
        );
        setDonations(res.data);
      } else {
        const res = await axios.get(`${server}/admin/get-payments`, {
          headers: {
            Authorization: `${currentUser.data.accessToken}`,
          },
        });
        console.log("res", res);

        setDonations(res.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllDonations();
  }, [search, page]);

  return (
    <Layout>
      <div className="absolute sm:left-[30%] mt-4">
        <div className="flex flex-col">
          <div className=" overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
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
                        Pancard{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"
                      >
                        {" "}
                        Address{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"
                      >
                        {" "}
                        Purpose{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"
                      >
                        {" "}
                        ₹Amount{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300 ">
                    {donations?.data?.payments.map((d) => (
                      <tr
                        key={d._id}
                        className="bg-white transition-all duration-500 hover:bg-gray-50"
                      >
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                          {" "}
                          {d.name}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {d.email}{" "}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {d.phone}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {d.pancard}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {d.address}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {d.purpose}
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          {" "}
                          {d.amount}
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
            totalPages={donations?.data?.totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Donations;
