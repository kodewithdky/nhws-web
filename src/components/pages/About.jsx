import { MapPin } from "lucide-react";
import google_map from "../../../src/assets/wallpaper/google_map.png";
import join from "../../../src/assets/wallpaper/joining.jpeg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LodingButton from "../../../utils/LodingButton";
import Layout from "../../layout/Layout";

const locations = [
  {
    title: "Kaushambi office",
    timings: "Mon-Sat 9am to 5pm",
    address: "231 Udahin Khurd Sirathu, Kaushambi, Uttar Pradesh (212217)",
  },
];

const About = () => {
  const server = import.meta.env.VITE_SERVER;
  const [loading, setLoading] = useState(false);
  const [teamData, setTeamData] = useState();

  const getAllTeam = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${server}/team/get`);
      setTeamData(res.data);
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
      title={"Namaskar Humanity Welfare Society -About"}
      description={
        "Namaskar Humanity Welfare Society, we are a passionate group of individuals bound by a common purpose – to bring positive change and uplift communities in need. Our team is a vibrant mix of visionaries, social workers, and volunteers, all united by the belief that together, we can create a more compassionate and equitable world. With diverse skills and expertise, each member brings a unique perspective, contributing to our collective mission of humanitarian service. Whether we are organizing grassroots initiatives, empowering marginalized groups, or driving social impact projects, our team works with unwavering dedication and integrity. We believe in the power of empathy and action, and through our collaborative efforts, we aim to transform lives and build a brighter future for all."
      }
      keywords={"help, educate, donate, welfare society"}
    >
      <div>
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col space-y-6 pb-6 pt-6 md:pt-12">
            <div className="max-w-max rounded-full border bg-gray-50 p-1 px-3">
              <p className="text-xs font-semibold leading-normal md:text-sm ">
                About the NGO
              </p>
            </div>
            <p className="text-3xl font-bold md:text-5xl md:leading-10 text-blue-900">
              Made with love, right here in India
            </p>
            <p className="max-w-4xl text-base text-gray-600 md:text-xl">
              At Namaskar Humanity Welfare Society, every initiative, every act
              of kindness, and every step towards a brighter future is born from
              the heart of India. Rooted in the rich heritage of compassion and
              unity, our work is a reflection of the love we carry for our
              people and our nation. From the vibrant cities to the quiet
              villages, our efforts span across India, touching lives and
              spreading hope. With a deep sense of pride in our country and an
              unwavering commitment to its people, we create lasting
              change—crafted with love, right here in the heart of India.
            </p>
          </div>
          <div className="w-full space-y-4">
            <img
              className="h-[200px] w-full rounded-xl object-cover md:h-full"
              src={google_map}
              alt="google_map"
            />
          </div>
          <div className="my-8 flex flex-col gap-y-6 md:flex-row lg:justify-around">
            {locations.map((location) => (
              <div
                key={location.title}
                className="flex flex-col space-y-3 md:w-2/4 lg:w-1/5"
              >
                <MapPin className="h-5 w-5" />
                <p className="w-full text-xl font-semibold  text-gray-900">
                  {location.title}
                </p>
                <p className="w-full text-base text-gray-700">
                  {location.timings}
                </p>
                <p className="text-sm font-medium">{location.address}</p>
              </div>
            ))}
          </div>
          <hr className="mt-20" />
          <div className="mt-16 flex items-center">
            <div className="space-y-6 md:w-3/4">
              <div className="max-w-max rounded-full border bg-gray-50 p-1 px-3">
                <p className="text-xs font-semibold leading-normal md:text-sm">
                  Join Us &rarr;
                </p>
              </div>
              <p className="text-3xl font-bold text-blue-900 md:text-4xl">
                Meet our team
              </p>
              <p className="max-w-4xl text-base text-gray-700 md:text-xl">
                Namaskar Humanity Welfare Society, we are a passionate group of
                individuals bound by a common purpose – to bring positive change
                and uplift communities in need. Our team is a vibrant mix of
                visionaries, social workers, and volunteers, all united by the
                belief that together, we can create a more compassionate and
                equitable world. With diverse skills and expertise, each member
                brings a unique perspective, contributing to our collective
                mission of humanitarian service. Whether we are organizing
                grassroots initiatives, empowering marginalized groups, or
                driving social impact projects, our team works with unwavering
                dedication and integrity. We believe in the power of empathy and
                action, and through our collaborative efforts, we aim to
                transform lives and build a brighter future for all.
              </p>
              <div></div>
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center">
              <LodingButton />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 gap-y-6 border-b border-gray-300 py-12 pb-20 md:grid-cols-2 lg:grid-cols-4">
              {teamData?.data?.map((user) => (
                <div className="rounded-md border" key={user?._id}>
                  <img
                    src={user?.avatar?.url}
                    alt={user?.name}
                    className="h-[300px] w-full rounded-lg object-cover "
                  />
                  <p className="mt-6 w-full px-2 text-xl  font-semibold text-gray-900">
                    {user?.name}
                  </p>
                  <p className="w-full px-2 pb-6 text-sm font-semibold text-gray-500">
                    {user?.role}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col items-center gap-x-4 gap-y-4 py-16 md:flex-row">
            <div className="space-y-6">
              <p className="text-sm font-semibold md:text-base">
                Join our team &rarr;
              </p>
              <p className="text-3xl font-bold md:text-4xl text-blue-900">
                We&apos;re just getting started
              </p>
              <p className="text-base text-gray-600 md:text-lg">
                At Namaskar Humanity Welfare Society, our journey of compassion
                and service has only just begun. Every step we take, every hand
                we hold, and every life we touch inspires us to dream bigger and
                do more. While we’ve already made an impact, we know the road
                ahead is filled with new challenges and endless opportunities to
                uplift humanity. With hearts full of hope and unwavering
                commitment, we are ready to reach farther, serve deeper, and
                spread kindness in ways we’ve only imagined. Together, with the
                power of community, we are building a brighter tomorrow—and this
                is only the beginning.
              </p>
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <Link to={"/register-as-volunteer"}>Join Now</Link>
              </button>
            </div>
            <div className="md:mt-o mt-10 w-full">
              <img src={join} className="rounded-lg" />
            </div>
          </div>
        </div>
        <hr className="mt-6" />
      </div>
    </Layout>
  );
};

export default About;
