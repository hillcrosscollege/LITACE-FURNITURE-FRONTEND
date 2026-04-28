import About_Hero_Card from "./about_components/About_Hero_Card";
import About_Hero from "./about_components/About_Hero";
import About_Why from "./about_components/About_Why";
import About_Vision from "./about_components/About_Vision";
import About_Last from "./about_components/About_Last";
import About_Litace from "./about_components/About_Litace";

const About_View = () => {
  return (
    <>
      <About_Hero />
      <About_Hero_Card />
      <About_Litace />
      <About_Vision />
      <About_Why />
      <About_Last />
    </>
  );
};

export default About_View;
