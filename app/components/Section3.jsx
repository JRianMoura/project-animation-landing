"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const startAnimation = (elem, position) => {
        gsap.to(elem, {
          x: position,
          duration: 2,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            // markers: true,
            scrub: 1,
          },
        });
      };

      startAnimation(".jet-1", 1800);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="bg-blue-400 w-full h-screen flex items-center justify-center relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="flex gap-10 items-center justify-center">
        <Image
          src="/jet/jet3.png"
          width={500}
          height={500}
          className="jet-1 absolute z-[2] left-[-400]"
          alt="jet"
        />
      </div>
    </section>
  );
}
