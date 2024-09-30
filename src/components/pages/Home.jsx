import education1 from "../../../src/assets/wallpaper/education.jpeg";
import awareness from "../../../src/assets/wallpaper/11.jpg";
import woman from "../../../src/assets/wallpaper/woman.jpg";
import helth from "../../../src/assets/wallpaper/health.jpeg";
import { Link } from "react-router-dom";
import b1 from "../../../src/assets/wallpaper/b1.jpeg";
import b2 from "../../../src/assets/wallpaper/b2.jpeg";
import b3 from "../../../src/assets/wallpaper/b3.jpg";
import { Carousel } from "@material-tailwind/react";
import Layout from "../../layout/Layout";

const Home = () => {
  return (
    <Layout
      title={"Namaskar Humanity Welfare Society -Home"}
      description={
        "Namaskar Humanity Welfare Society is a UP government-registered NGO dedicated to making a positive impact on society through various initiatives. Our primary focus is on providing quality education, accessible healthcare services, and raising awareness on critical social issues. We are also committed to the empowerment of women, helping them gain independence and self-sufficiency through skill development and support programs. Our mission is to uplift underserved communities by addressing their most pressing needs, fostering growth, and creating opportunities for a better, more equitable future for all."
      }
      keywords={"help, educate, donate,welfare society"}
    >
      <section className="mb-32 xl:mb-16">
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel
            autoplay={true}
            loop={true}
            className="rounded-0"
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                      activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            )}
          >
            <img
              src={b1}
              alt="banner1"
              className="h-full w-full object-cover"
            />
            <img
              src={b2}
              alt="banner2"
              className="h-full w-full object-cover"
            />
            <img
              src={b3}
              alt="banner3"
              className="h-full w-full object-cover"
            />
          </Carousel>
        </div>
      </section>

      <section className="inline-block mt-10">
        <div className="relative bg-gradient-to-r mt-4 overflow-hidden">
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
            <h2 className="text-3xl font-bold leading-tight text-blue-900">
              I'm Anurag Singh and I'm super excited to welcome you to at
              Namaskar Humanity Welfare Society
            </h2>
            <p className="text-lg text-gray-900 w-[96%]">
              Namaskar Humanity Welfare Society is a UP government-registered
              NGO dedicated to making a positive impact on society through
              various initiatives. Our primary focus is on providing quality
              education, accessible healthcare services, and raising awareness
              on critical social issues. We are also committed to the
              empowerment of women, helping them gain independence and
              self-sufficiency through skill development and support programs.
              Our mission is to uplift underserved communities by addressing
              their most pressing needs, fostering growth, and creating
              opportunities for a better, more equitable future for all.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="relative bg-gradient-to-r mt-4 overflow-hidden">
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
            <h2 className="text-4xl font-bold leading-tight text-blue-900">
              Our Vision
            </h2>
            <p className="text-lg mb-8 mx-2 w-[96%]">
              Namaskar Humanity Welfare Society is an NGO with a clear vision to
              create a just and inclusive society where every individual,
              regardless of their background, has access to education,
              healthcare, and equal opportunities. Our vision is to empower the
              underprivileged, promote gender equality, and raise awareness
              about social and environmental issues. We strive to build a
              compassionate community where everyone can thrive, contribute, and
              lead a dignified life. Through sustainable development initiatives
              and collaborative efforts, we aim to bring lasting positive change
              to society.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto flex px-5 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h2 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-blue-900">
              Education
            </h2>
            <p className="mb-4 leading-relaxed">
              Education is the key to unlocking opportunities and breaking the
              cycle of poverty. Namaskar Humanity is dedicated to promoting
              education by providing resources, scholarships, and support to
              students in need. We believe that education is a fundamental
              right, not a privilege.
            </p>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={education1}
            />
          </div>
        </div>
        <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 max-sm:hidden max-md:hidden ">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={awareness}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h2 className="title-font sm:text-4xl text-3xl mb-4 mx-4 font-medium text-blue-900">
              Awareness
            </h2>
            <p className="mb-8 leading-relaxed mx-4">
              Awareness is the first step towards change. We organize awareness
              campaigns on various social and environmental issues, such as
              hygiene, sanitation, climate change, and more. Our goal is to
              raise awareness and inspire action in our communities.
            </p>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 lg:hidden md:hidden">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={awareness}
            />
          </div>
        </div>
        <div className="container mx-auto flex px-5 py-4 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h2 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-blue-900">
              Healthcare
            </h2>
            <p className="mb-8 leading-relaxed">
              We are passionate about improving the overall health and
              well-being of communities. Through various health initiatives,
              medical camps, and awareness programs, we strive to ensure that
              everyone has access to healthcare services and information that
              can save lives.
            </p>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={helth}
            />
          </div>
        </div>
        <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 max-sm:hidden max-md:hidden ">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={woman}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h2 className="title-font sm:text-4xl text-3xl mb-4 mx-4 font-medium text-blue-900">
              Women Empowerment
            </h2>
            <p className="mb-8 leading-relaxed mx-4">
              Namaskar Humanity Welfare Society is dedicated to providing
              services for women empowerment. The organization's mission is to
              make women self-reliant, raise awareness about their rights, and
              strengthen their role in society. Through various programs and
              workshops, the society offers education, skill development, and
              employment opportunities to empower women both economically and
              socially.
            </p>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 lg:hidden md:hidden">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={woman}
            />
          </div>
        </div>
      </section>
      <section>
        <div className="relative">
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
            <h2 className="text-4xl font-bold leading-tight mb-2 text-blue-900">
              Register to become volunteer
            </h2>
            <p className="text-lg mb-8 w-[96%]">
              Join Namaskar Humanity Welfare Society as a volunteer and become a
              part of a mission to transform lives and build a better future for
              those in need. Volunteering with us is not just about giving back,
              but about making a real impact in the lives of underprivileged
              communities. Whether you're passionate about education,
              healthcare, women’s empowerment, or environmental sustainability,
              your efforts can make a difference. As a registered volunteer,
              you’ll have the opportunity to contribute your skills, time, and
              compassion to meaningful projects that bring hope and change.
              Together, we can create a more equitable and compassionate
              society—your journey toward making a difference starts here!
            </p>
            <Link
              to="/register-as-volunteer"
              className="bg-green-300 text-gray-900 hover:bg-blue-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
      <section className="sm:mt-24">
        <div className="relative bg-gradient-to-r h-[50vh] my-3">
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
            <h2 className="text-4xl font-bold leading-tight mb-2 text-blue-900">
              Donate
            </h2>
            <p className="text-lg mb-8 w-[96%]">
              Namaskar Humanity Welfare Society is on a mission to uplift lives,
              spread hope, and create a brighter tomorrow. Every donation is a
              step towards building a world where compassion leads the way, and
              no one is left behind. Join us in making a difference—because
              together, we can transform lives. No act of kindness is too small;
              every contribution brings us closer to a better world. Donate
              today, and be the light that shines in someone’s darkest hour.
            </p>
            <Link
              to="/donate"
              className="bg-green-300 text-gray-900 hover:bg-blue-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg sm:mb-24"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
