import Link from "next/link";
import { footerData } from "./data";
import App_Header_Text from "../app_ui/App_Text";
import Image from "next/image";
import { Logo } from "@/assets/img";
import App_Text from "../app_ui/App_Text";

const App_Footer = () => {
  return (
    <footer className="bg-primary/20">
      <section className="containerclass pt-20 pb-4 grid gap-16">
        <div className="flex flex-col md:flex-row">
          <div className="w-[50%] flex flex-col gap-6">
            <Image
              alt="Litace"
              className="w-32"
              src={Logo.src}
              width={400}
              height={4800}
            />
            <p className="max-w-md italic text-sm">
              Redefining artisanal standards for institutional and residential
              furniture across Southern Africa.
            </p>
            {/* <p className="text-white">Socials</p> */}
          </div>
          <div className="w-[50%] flex justify-between">
            {footerData.map((item, index) => (
              <div key={index}>
                {/* <h5 className="text-white font-medium mb-4">{item.name}</h5> */}
                <App_Text
                  children={item.name}
                  variant="sectionSub"
                  className="uppercase text-primary font-bold text-xs tracking-[0.2em] mb-4"
                />
                <div className="flex flex-col gap-2">
                  {item.list.map((item, index) => (
                    <Link
                      href={item.link}
                      key={index}
                      className="text-slate-500 text-sm hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <img src={LogoText} alt="" className="w-full" /> */}
        {/* <div className="w-full"> */}
        {/* <svg
          width="100%"
          height="134"
          viewBox="0 0 577 134"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.000354871 131.962V1.78009H23.5831V112.193H80.919V131.962H0.000354871ZM121.39 1.78009V131.962H97.8071V1.78009H121.39ZM137.626 21.5489V1.78009H241.492V21.5489H201.255V131.962H177.863V21.5489H137.626ZM258.92 131.962H233.749L279.579 1.78009H308.692L354.586 131.962H329.414L294.644 28.4775H293.627L258.92 131.962ZM259.747 80.9189H328.397V99.8614H259.747V80.9189ZM473.465 45.7037H449.691C449.013 41.8051 447.763 38.3514 445.941 35.3426C444.119 32.2915 441.852 29.7065 439.14 27.5876C436.427 25.4688 433.334 23.8796 429.859 22.8202C426.427 21.7184 422.719 21.1675 418.735 21.1675C411.658 21.1675 4005.386 22.9474 399.92 26.507C394.453 30.0243 390.173 35.1943 387.08 42.017C383.986 48.7973 382.439 57.0819 382.439 66.871C382.439 76.8296 383.986 85.2202 387.08 92.0429C390.215 98.8232 394.496 103.951 399.92 107.426C4005.386 110.858 411.637 112.574 418.672 112.574C422.57 112.574 426.215 112.066 429.605 111.049C433.037 109.989 436.11 108.443 438.822 106.409C441.576 104.375 443.886 101.874 445.75 98.9079C447.657 95.9416 448.971 92.5514 449.691 88.7375L473.465 88.8646C472.575 95.0516 470.647 100.857 467.68 106.282C464.756 111.706 460.921 116.494 456.175 120.647C451.429 124.758 445.878 127.978 439.521 130.309C433.164 132.598 426.109 133.742 418.354 133.742C406.912 133.742 396.699 131.093 387.715 125.796C378.731 120.499 371.654 112.85 366.484 102.849C361.314 92.848 358.729 80.8554 358.729 66.871C358.729 52.8442 361.336 40.8516 366.548 30.893C371.76 20.8921 378.858 13.243 387.842 7.94593C396.826 2.64882 406.997 0.000261486 418.354 0.000261486C425.6 0.000261486 432.338 1.01731 438.568 3.05139C444.797 5.08549 450.348 8.07306 455.222 12.0141C460.095 15.9128 464.1 20.7014 467.235 26.3799C470.414 32.016 472.49 38.4573 473.465 45.7037ZM491.481 131.962V1.78009H576.15V21.5489H515.064V56.8912H571.764V76.6601H515.064V112.193H576.659V131.962H491.481Z"
            fill="url(#paint0_linear_3058_11316)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_3058_11316"
              x1="527.16"
              y1="1.96191"
              x2="527.16"
              y2="131.962"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4E4F50" />
              <stop offset="1" stopColor="#101213" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg> */}
        {/* </div> */}

        <div className="flex justify-between text-darkgray">
          <p>© 2025 Novure. All rights reserved.</p>
          <div className="flex gap-6">
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
            <p>Cookies Settings</p>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default App_Footer;
