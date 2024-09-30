import axios from "axios";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LodingButton from "../../../utils/LodingButton";

const AllProgram = () => {
  const server = import.meta.env.VITE_SERVER;
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [programData, setProgramData] = useState();
  const [programId, setProgramId] = useState(null);

  const getAllProgram = async () => {
    try {
      const res = await axios.get(`${server}/program/get`);
      setProgramData(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    setProgramId(id);
    try {
      const res = await axios.delete(`${server}/program/delete/${id}`, {
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
    getAllProgram();
  }, [deleteLoading]);

  return (
    <div className="absolute sm:left-[20%] p-1 max-sm:left-[20%]">
      <ul
        className="grid grid-cols-1 gap-8 px-1 md:grid-cols-2 
   lg:grid-cols-3 md:p-2 xl:p-4"
      >
        {programData?.data.map((p) => (
          <li
            key={p?._id}
            className="relative flex w-full gap-4 p-2 border border-gray-700 rounded hover:transition shadow-md"
          >
            <div className="flex flex-col justify-between flex-grow gap03 px-2">
              <div className="w-full">
                {p?.title}
                <p className="pt-1 text-sm text-black ">{p?.description}</p>
              </div>
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1 px-2 py-1 text-gra-700 rounded cursor-pointer">
                  {deleteLoading && programId === p?._id ? (
                    <LodingButton content={""} btnClass={""} />
                  ) : (
                    <RiDeleteBin6Line
                      color="red"
                      onClick={() => handleDelete(p?._id)}
                    />
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllProgram;
