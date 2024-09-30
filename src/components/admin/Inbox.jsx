import { useEffect, useState } from "react";
import Layout from "./layout/Layout";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LodingButton from "../../../utils/LodingButton";


const Inbox = () => {
  const server = import.meta.env.VITE_SERVER;
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [messageData, setMessageData] = useState();
  const [messageId, setMessageId] = useState(null);

  const getAllMessage = async () => {
    try {
      const res = await axios.get(`${server}/message/get`, {
        headers: {
          Authorization: `${currentUser.data.accessToken}`,
        },
      });
      setMessageData(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    setMessageId(id);
    try {
      const res = await axios.delete(`${server}/message/delete/${id}`, {
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

  useEffect(() => {
    getAllMessage();
  }, [deleteLoading]);

  return (
    <Layout>
      <div className="absolute sm:left-[20%] p-1 ">
        <ul
          className="grid grid-cols-1 gap-8 px-1 md:grid-cols-2 
   lg:grid-cols-3 md:p-2 xl:p-4"
        >
          {messageData?.data?.map((m) => (
            <li
              key={m?._id}
              className="relative flex w-full gap-4 p-2 border border-gray-700 rounded hover:transition shadow-md"
            >
              <div className="flex flex-col justify-between flex-grow gap03 px-2">
                <div className="w-full">
                  {m?.name}
                  <p className="pt-1 text-sm text-black ">{m?.message}</p>
                </div>
                <div className="flex items-center justify-between gap-1">
                  <div className="text-sm text-gray-700">{m?.email}</div>
                  <div className="text-sm text-gray-700">{m?.phone}</div>
                  <div className="flex items-center gap-1 px-2 py-1 text-gra-700 rounded cursor-pointer">
                    {deleteLoading && messageId === m?._id ? (
                      <LodingButton content={""} btnClass={""} />
                    ) : (
                      <RiDeleteBin6Line
                        color="red"
                        onClick={() => handleDelete(m?._id)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Inbox;
