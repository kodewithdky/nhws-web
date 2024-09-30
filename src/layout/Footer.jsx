import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoHome, IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import logo from "../assets/logo/nhws-logo.png";
import { Link } from "react-router-dom";
import rpnhws from "../../src/assets/legal/rpnhws.pdf";
import ppnhws from "../../src/assets/legal/ppnhws.pdf";
import tcnhws from "../../src/assets/legal/tcnhws.pdf";

const Footer = () => {
  return (
    <footer className="bg-zinc-50 text-center text-surface/75 dark:bg-neutral-700 dark:text-white/75 lg:text-left shadow-sm">
      <div className="flex items-center justify-center border-b-2 border-neutral-200 p-6 dark:border-white/10 lg:justify-between">
        <div className="me-12 hidden lg:block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div className="flex justify-center">
          <Link
            to="https://www.facebook.com/profile.php?id=61550911495716&mibextid=avESrC"
            className="me-6"
            target="_blank"
          >
            <FaFacebookF />
          </Link>
          <Link to="https://x.com/nhws_2024" className="me-6 " target="_blank">
            <FaXTwitter />
          </Link>
          <Link
            to="https://www.youtube.com/channel/UC6N0h0YRexgJKT38IRbYUvw"
            className="me-6"
            target="_blank"
          >
            <FaYoutube />
          </Link>
          <Link
            to="https://www.instagram.com/nhws_2024/"
            className="me-6"
            target="_blank"
          >
            <FaInstagram />
          </Link>
          <Link
            to="https://www.linkedin.com/company/101342918/admin/feed/posts/"
            className="me-6"
            target="_blank"
          >
            <FaLinkedinIn />
          </Link>
          <Link
            to="https://whatsapp.com/channel/0029VaAnhuGGE56oOK8q5h24"
            className=""
            target="_blank"
          >
            <FaWhatsapp />
          </Link>
        </div>
      </div>
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              <Link to={"/"} className="me-3">
                <img src={logo} alt="logo" height="50" width="50" />
              </Link>
              NHWS
            </h6>
            <p>
              Namaskar, Help them grow..... Namaskar Humanity Welfare Society is
              a 12A & 80G registered NGO dedicated to providing education and
              health services to underprivileged communities
            </p>
          </div>
          <div>
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Services
            </h6>
            <p className="mb-4 ">
              <Link className="hover:text-blue-700" to="#">
                To create a world
              </Link>
            </p>
            <p className="mb-4 ">
              <Link className="hover:text-blue-700" to="#">
                {" "}
                Food & Shelter
              </Link>
            </p>
            <p className="mb-4 ">
              <Link className="hover:text-blue-700" to="#">
                Health
              </Link>
            </p>
            <p>
              <Link className="hover:text-blue-700" to="#">
                Other
              </Link>
            </p>
          </div>
          <div>
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Legal
            </h6>
            <p className="mb-4">
              <Link className="hover:text-blue-700" to={rpnhws} target="_blank">
                Refund Policy
              </Link>
            </p>
            <p className="mb-4 ">
              <Link className="hover:text-blue-700" to={ppnhws} target="_blank">
                Privacy
              </Link>
            </p>
            <p className="mb-4 ">
              <Link className="hover:text-blue-700" to={tcnhws} target="_blank">
                Terms & Condition
              </Link>
            </p>
            <p>
              <Link
                className="hover:text-blue-700"
                to="https://wa.me/message/G65LMMIBOK25D1"
                rel="noreferrer"
                target="_blank"
              >
                Help
              </Link>
            </p>
          </div>
          <div>
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Contact
            </h6>
            <p className="mb-4 flex items-center justify-center md:justify-start">
              <span className="me-3">
                <IoHome />
              </span>
              Udahin Khurd Sirathu, Kaushambi, 212217
            </p>
            <p className="mb-4 flex items-center justify-center md:justify-start">
              <span className="me-3">
                <MdEmail />
              </span>
              help@namaskarhumanity.org
            </p>
            <p className="mb-4 flex items-center justify-center md:justify-start">
              <span className="me-3">
                <IoCall />
              </span>
              +91 8808250884
            </p>
            <p className="flex items-center justify-center md:justify-start">
              <span className="me-3">
                <IoCall />
              </span>
              +91 7379164906
            </p>
          </div>
        </div>
      </div>
      {/*Copyright section*/}
      <div className="bg-black/5 p-6 text-center">
        <span>&copy; 2024 Copyright:&nbsp;</span>
        <Link className="font-semibold" to="/">
          Namaskar Humanity Welfare Society
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
