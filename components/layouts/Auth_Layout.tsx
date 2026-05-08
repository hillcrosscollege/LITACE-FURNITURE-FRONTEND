import Image from "next/image";
import React from "react";
import App_Double_Text from "../shared/App_Double_Text";
import App_Nav from "../shared/App_Nav";
import App_Footer from "../shared/App_Footer";

const Auth_Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <App_Nav />
      <section className="flex h-screen bg-primary/30">
        <div className="flex-1 flex containerclass">
          <div className="hidden xl:block xl:w-[50%] h-full relative py-4 pl-4">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwduLZd_XqDq3CPIxMl1X7MotMkVuW_oI24rzX1972f9k2aLnT65ko8h8l5BwjJgn9g5H3F60d1hPmmqOlXrF_jEFu59I3tO0XhdqeBVZEDOFtVKn4q4pXrf5Oz_NPQN6snF-yrlurUy0h_kH64N4CbPo53bDRYvd81ZMJGkeHDsuaDLaxd6LNtqUshkC87o8e2rLfvjWVsyhlrTqrk58avmrzePkampMqSE0xFkh9LKvr43F_cnvwTBuAOWakTDB8gNr29It8O2g"
              alt="auth-bg"
              className="w-full h-full rounded-xl"
              width={400}
              height={400}
            />
            <section className="absolute left-4 top-4 bottom-4 py-20 inset-0  flex flex-col justify-center items-center gap-8">
              <App_Double_Text
                textContentStyle="gap-y-2 z-1 items-center"
                header={{
                  text: "Litace Furnitures",
                  type: "subhead",
                  style: "text-white",
                }}
                para={{
                  text: "Our commitment to quality and service sets us apart",
                  style: "text-white text-lg font-semibold",
                }}
              />
              <div className="bg-white border border-primary p-4 rounded-xl z-1 w-[70%]"></div>
            </section>
            <div className="left-4 top-4 bottom-4 right-0  bg-primary/40 absolute rounded-xl"></div>
          </div>
          <div className="w-full xl:w-[50%] h-full flex justify-center items-center ">
            {children}
          </div>
        </div>
      </section>
      <App_Footer />
    </>
  );
};

export default Auth_Layout;
