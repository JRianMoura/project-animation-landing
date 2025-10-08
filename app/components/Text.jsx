"use client";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Text = () => {
  useLayoutEffect(() => {
    gsap.registerPlugin(SplitText, ScrollTrigger);

    let split = SplitText.create(".split", {
      type: "chars",
      mask: "chars",
    });

    gsap.from(split.chars, {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: "power4",
      stagger: 0.5,
      scrollTrigger: {
        trigger: ".split-item",
        // markers: true,
        // scrub: true,
        start: "top 400px",
        end: "bottom 400px",
      },
    });

    return () => {
      gsap.killTweensOf(".split");
    };
  }, []);

  return (
    <section className="h-screen flex items-center justify-center split-item">
      <div className="text-purple-700 font-bold text-9xl tracking-widest split">
        SEADOO
      </div>
    </section>
  );
};

export default Text;
