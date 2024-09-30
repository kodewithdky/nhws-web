import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import LodingButton from "./LodingButton";

const VerifyEmail = () => {
  const server = import.meta.env.VITE_SERVER;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const VerifyEmail = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${server}/auth/verify/${id}`);
      if (res.data.success) {
        setMessage(res.data.message);
      }
      setLoading(false);
    } catch (error) {
      setMessage(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    VerifyEmail();
  }, []);

  return (
    <>
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <LodingButton />
        </div>
      ) : (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-green-500 sm:text-5xl">
              {message}
            </h1>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </Link>
              <Link
                to="/contact"
                className="text-sm font-semibold text-gray-900"
              >
                Contact <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default VerifyEmail;
