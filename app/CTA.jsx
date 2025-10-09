import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import PathParade from "./components/PathParade";
import MaisFacil from "./components/MaisFacil";
import CarOnRoadScroll from "./components/CarOnRoadScroll";
import Text from "./components/Text";

const CTA = () => {
  return (
    <section className="flex flex-col items-center">
      <Section1 />
      <Section2 />
      <Section3 />
      <MaisFacil />
      <PathParade />
      <CarOnRoadScroll />
      <Text />
    </section>
  );
};

export default CTA;
