import MaisFacil from "./components/MaisFacil";
import PathParade from "./components/PathParade";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import Text from "./components/Text";
import CarOnRoadScroll from "./components/CarOnRoadScroll";

const CTA = () => {
  return (
    <section className="bg-gradient-to-b h-screen bg-white text-black flex flex-col items-center">
      <Section1 />
      <Section2 />
      <Section3 />
      <PathParade />
      <MaisFacil />
      <CarOnRoadScroll />
      <Text />
    </section>
  );
};

export default CTA;
