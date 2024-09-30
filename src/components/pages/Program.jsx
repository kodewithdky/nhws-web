
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../layout/Layout";
import LodingButton from "../../../utils/LodingButton";
import ImageCard from "../../../utils/ImageCard";

const Program = () => {
  const server = import.meta.env.VITE_SERVER;
  const [loading, setLoading] = useState(false);
  const [programData, setProgramData] = useState();

  const getAllTeam = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${server}/program/get`);
      setProgramData(res.data);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTeam();
  }, []);

  return (
    <Layout
      title={"Namaskar Humanity Welfare Society -Program"}
      description={
        "Namaskar Humanity Welfare Society is an NGO that regularly organizes a variety of programs aimed at improving the lives of underprivileged communities. These programs include educational drives to support children’s learning, healthcare camps providing free medical check-ups and treatments, and awareness campaigns on important social issues such as hygiene, sanitation, and environmental protection. We also organize skill development workshops to promote women’s empowerment, enabling them to become self-reliant. Additionally, our NGO conducts community outreach programs focused on disaster relief, mental health awareness, and promoting gender equality. Each initiative is designed to create lasting, positive change."
      }
      keywords={"help, educate, donate, welfare society"}
    >
      <section className="py-12 sm:py-12 lg:py-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="w-full mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl xl:text-5xl mb-6 text-blue-900">
              Here are Latest program that we will organize
            </h2>
            <p className="mb-4">
              Namaskar Humanity Welfare Society is an NGO that regularly
              organizes a variety of programs aimed at improving the lives of
              underprivileged communities. These programs include educational
              drives to support children’s learning, healthcare camps providing
              free medical check-ups and treatments, and awareness campaigns on
              important social issues such as hygiene, sanitation, and
              environmental protection. We also organize skill development
              workshops to promote women’s empowerment, enabling them to become
              self-reliant. Additionally, our NGO conducts community outreach
              programs focused on disaster relief, mental health awareness, and
              promoting gender equality. Each initiative is designed to create
              lasting, positive change.
            </p>
          </div>
          {loading ? (
            <div className="flex justify-center">
              <LodingButton />
            </div>
          ) : (
            <div className="grid max-w-4xl lg:max-w-6xl grid-cols-1 mx-auto mt-8 text-center gap-y-4 sm:gap-x-8 sm:grid-cols-2 lg:grid-cols-3 sm:mt-12 lg:mt-20 sm:text-left">
              {programData?.data.map((p) => (
                <ImageCard
                  key={p?._id}
                  image={p?.coverImage?.url}
                  title={p?.title}
                  description={p?.description}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Program;
