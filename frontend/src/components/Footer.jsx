import { Link } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillX,
} from "react-icons/ai";
const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start md:justify-around w-[100%] mt-2 p-2 rounded-tl-[50px] rounded-br-[40px] bg-[#F6F6F6] dark:bg-[#32596D] shadow-xl dark:text-[#CEE8F5]">
      <div className="mt-4 ">
        <div className="text-[#B3A375] dark:text-[#DEC991] text-5xl font-bold animate-bounce">
          VoteIn
        </div>
      </div>

      <div className="mt-2">
        <div className="text-2xl text-[#B3A375] dark:text-[#DEC991] font-semibold text-center md:text-start">
          ADDRESS
        </div>
        <div className="flex justify-between md:flex-col md:items-start gap-x-[90px] md:gap-x-[1px]">
          <div className="wrap-anywhere">
            <div>LAGOS OFFICE</div>
            <div>ALLEN AVENUE 4</div>
            <div>IKEJA</div>
            <div>LAGOS</div>
          </div>
          <div className="wrap-anywhere">
            <div>ABUJA OFFICE</div>
            <div>27 WUSE STRAIGHT</div>
            <div>GWAGWALADA</div>
            <div>ABUJA</div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-2xl text-[#B3A375] dark:text-[#DEC991] font-semibold text-center md:text-start">
          SOCIALS
        </div>
        <div className="flex md:flex-col gap-x-4 md:gap-x-2">
          <div className="flex items-center wrap-anywhere">
            <div>INSTAGRAM</div>
            <div>
              <AiFillInstagram />
            </div>
          </div>

          <div className="flex items-center wrap-anywhere">
            <div>FACEBOOK</div>
            <div>
              <AiFillFacebook />
            </div>
          </div>

          <div className="flex items-center wrap-anywhere">
            <div>X</div>
            <div>
              <AiFillTwitterCircle />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-2xl text-[#B3A375] dark:text-[#DEC991] font-semibold text-center md:text-start">
          CONTACT US
        </div>
        <div className="flex md:flex-col gap-x-4 md:gap-x-2">
          <div className="wrap-anywhere">HELLO@VOTEIN</div>
          <div className="wrap-anywhere">+123-456-789</div>
          <div className="wrap-anywhere">HELLO@MAIL.COM</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-2xl text-[#B3A375] dark:text-[#DEC991] font-semibold text-center md:text-start">
          PAGES
        </div>
        <div className="flex md:flex-col gap-x-4 md:gap-x-2 wrap-anywhere">
          <div>
            <Link
              to="/"
              className="hover:text-yellow-500 hover:underline hover:decoration-double hover:decoration-red-700 transition duration-700 ease-in-out"
            >
              HOME
            </Link>
          </div>
          <div>
            <Link
              to="/about"
              className="hover:text-yellow-500 hover:underline hover:decoration-double hover:decoration-red-700 transition duration-700 ease-in-out"
            >
              ABOUT
            </Link>
          </div>
          <div>
            <Link
              to="/register"
              className="hover:text-yellow-500 hover:underline hover:decoration-double hover:decoration-red-700 transition duration-700 ease-in-out"
            >
              REGISTER
            </Link>
          </div>
          <div>
            <Link
              to="/login"
              className="hover:text-yellow-500 hover:underline hover:decoration-double hover:decoration-red-700 transition duration-700 ease-in-out"
            >
              LOGIN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
