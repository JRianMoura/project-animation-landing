"use client";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function Page() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const startAnimation = (elem, position) => {
        gsap.to(elem, {
          x: position,
          duration: 2,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: ".item1",
            start: "top center",
            end: "bottom center",
            // markers: true,
            // scrub: true,
          },
        });
      };

      startAnimation("#jet-1", -420);
      startAnimation("#jet-2", -125);
      startAnimation("#jet-3", 125);
      startAnimation("#jet-4", 420);
    });

    return () => {
      gsap.killTweensOf(".item1");
      ctx.revert();
    };
  }, []);

  return (
    <section className="w-full h-screen flex items-center justify-center relative item1 overflow-hidden">
      <div className="flex gap-10 items-center justify-center">
        <Image
          src="/jet/jet1.png"
          width={150}
          height={150}
          className=" absolute z-[4]"
          id="jet-1"
          alt="jet"
        />
        <Image
          src="/jet/jet2.avif"
          width={150}
          height={150}
          className=" absolute z-[3]"
          id="jet-2"
          alt="jet"
        />
        <Image
          src="/jet/jet3.png"
          width={150}
          height={150}
          className=" absolute z-[2]"
          id="jet-3"
          alt="jet"
        />
        <Image
          src="/jet/jet4.png"
          width={150}
          height={150}
          className=" absolute z-[1]"
          id="jet-4"
          alt="jet"
        />
      </div>
    </section>
  );
}
