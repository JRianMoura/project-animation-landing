import Image from "next/image";
import LogoPathMotion from "@/app/components/seadoo";
import LogoPathDrawLoop from "./LogoPathDrawLoop";

const Section1 = () => {
  return (
    <section className="bg-black w-full h-screen flex items-center justify-center text-white">
      {/* <Image src={"seadoo.svg"} width={500} height={500} alt="jet" /> */}
      {/* <LogoPathMotion /> */}
      <LogoPathDrawLoop />
    </section>
  );
};

export default Section1;
