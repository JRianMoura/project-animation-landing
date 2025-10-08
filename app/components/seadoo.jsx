"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Image from "next/image";

gsap.registerPlugin(MotionPathPlugin);

export default function LogoPathMotion() {
  const wrapRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wrap = wrapRef.current;
      const path =
        wrap.querySelector("#motionPath") || wrap.querySelector(".svg-elem-10");
      const dot = wrap.querySelector(".mp-dot");

      // Centraliza o dot pelo centro geométrico do elemento
      gsap.set(dot, { xPercent: -50, yPercent: -50 });

      // Desenho do traço (stroke) usando comprimento real do path
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // 1) “Desenha” o contorno
      tl.to(path, { strokeDashoffset: 0, duration: 2.2 });

      // 2) Faz o seguidor percorrer a curva em loop
      tl.to(
        dot,
        {
          duration: 50,
          repeat: -1,
          ease: "none",
          motionPath: {
            path,
            align: path, // alinha o elemento ao path
            autoRotate: true, // gira conforme a tangente
            alignOrigin: [0.5, 0.5],
            start: 0, // início do path (0 = 0%)
            end: 1, // fim do path (1 = 100%)
          },
        },
        "-=1.0" // começa a viajar antes do traço terminar de desenhar
      );
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto w-full max-w-6xl"
      style={{ aspectRatio: "991/112" }}
    >
      {/* Seguidor (o "foguetinho") */}
      <Image
        src={"/jet/jet3.png"}
        width={50}
        height={50}
        alt="Jet"
        className="mp-dot absolute z-10"
      />

      {/* Seu SVG — pode colar exatamente o que enviou.
          Só certifique-se de manter a classe .svg-elem-10 no path com stroke
          (ou adicione id="motionPath" nele e ajuste o seletor no JS). */}
      <svg
        viewBox="0 0 991 112"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path
          className="svg-elem-10"
          stroke="#800080"
          fill="transparent"
          d="m185.91 107.31c-3.21-1.32-6.13-3.27-8.58-5.72-2.46-2.46-4.4-5.37-5.73-8.59-1.32-3.21-1.99-6.65-1.98-10.12v-54.79c0-14.02 11.75-25.76 26.42-25.76h95.55c3.59 0 6.2 2.61 6.2 6.2v18.24c0 3.59-2.62 6.2-6.2 6.2h-74.68c-3.26 0-5.87 2.28-5.87 5.54 0 2.95 2.61 5.55 5.87 5.55h74.68c3.26 0 6.2 2.61 6.2 5.87v11.41c0 3.27-2.94 5.88-6.2 5.88h-74.68c-3.26 0-5.87 2.61-5.87 5.54 0 3.27 2.61 5.55 5.87 5.55h74.68c3.59 0 6.2 2.61 6.2 6.2v18.58c0 3.59-2.62 6.2-6.2 6.2h-95.55c-3.47 0.02-6.92-0.66-10.13-1.98zm647.34-79.54v54.78c0.01 3.48-0.66 6.92-1.98 10.13-1.32 3.21-3.27 6.13-5.73 8.58-2.45 2.46-5.37 4.41-8.58 5.73-3.21 1.32-6.65 1.99-10.12 1.98h-84.46c-3.47 0.01-6.91-0.66-10.12-1.98-3.22-1.32-6.13-3.27-8.59-5.73-2.45-2.45-4.4-5.37-5.72-8.58-1.32-3.21-2-6.65-1.98-10.13v-54.78c0-14.02 11.73-25.76 26.41-25.76h84.45c14.68 0 26.42 11.74 26.42 25.76zm-49.56 10.11c0-2.94-2.29-5.22-5.23-5.22h-27.71c-2.94 0-5.23 2.28-5.23 5.22v34.89q-0.01 1.04 0.38 2.01 0.4 0.96 1.13 1.7 0.74 0.73 1.71 1.13 0.97 0.39 2.01 0.38h27.71c2.94 0 5.23-2.29 5.23-5.22zm204.46-10.11v54.79c0 14.66-11.73 26.41-26.09 26.41h-84.78c-14.35 0-26.09-11.75-26.09-26.41v-54.79c0-14.02 11.74-25.76 26.09-25.76h84.78c14.36 0 26.09 11.74 26.09 25.76zm-49.56 10.11c0-2.94-2.28-5.22-5.21-5.22h-27.4c-2.94 0-5.22 2.28-5.22 5.22v34.89q-0.01 1.05 0.38 2.01 0.39 0.97 1.13 1.7 0.74 0.74 1.7 1.13 0.97 0.39 2.01 0.38h27.4c2.93 0 5.21-2.29 5.21-5.22zm-263.17-10.11v54.79c0 14.67-11.75 26.41-26.09 26.41h-136.64c-3.58 0-4.56-4.56-1.96-6.85l18.27-21.2c1.62-1.62 5.54-2.93 8.8-2.93h89.35c2.94 0 5.22-2.28 5.22-5.21v-35.55c0-2.94-4.89-5.54-8.48-1.3l-28.7 32.28c-1.95 2.61-5.21 3.26-8.14 3.59h-39.79c-4.89 0-5.55-5.22-2.61-8.48l50.54-56.42c2.29-2.93 7.18-4.89 11.09-4.89h43.05c14.34 0 26.09 11.74 26.09 25.76zm-201.55 81.52h-39.78c-2.94-0.32-5.87-1.29-8.15-3.58l-60.66-69.46c-3.59-4.25-8.48-1.63-8.48 1.3v35.55q-0.01 1.04 0.38 2.01 0.4 0.96 1.13 1.7 0.74 0.73 1.7 1.13 0.97 0.39 2.01 0.38h26.41c3.59 0 7.18 1.3 8.81 2.93l18.59 21.2c2.61 2.28 1.63 6.84-2.28 6.84h-73.7c-14.35 0-26.09-11.74-26.09-26.4v-54.79c0-14.02 11.74-25.76 26.09-25.76h43.05c4.24 0 9.13 1.95 11.09 4.89l82.5 93.59c2.94 3.26 2.28 8.48-2.62 8.47zm-325.77-59.34v32.94c0.01 3.47-0.66 6.91-1.99 10.12-1.32 3.22-3.26 6.13-5.72 8.59-2.45 2.45-5.37 4.4-8.58 5.72-3.21 1.32-6.65 1.99-10.13 1.98h-113.48c-3.26 0-6.2-2.61-6.2-6.2v-18.59c0-3.59 2.94-6.19 6.2-6.19h84.79c2.94 0 5.55-2.61 5.55-5.55 0-2.94-2.61-5.55-5.55-5.55h-67.83c-3.59 0-6.2-2.61-6.2-5.87v-33.26c0-14.02 11.74-25.76 26.42-25.76l96.52-0.32c3.26 0 6.2 2.93 6.2 6.2v18.58c0 3.26-2.93 5.87-6.2 5.87l-74.67 0.32c-3.26 0-5.55 2.29-5.55 5.55 0 2.94 2.29 5.55 5.55 5.55h74.67c3.59 0 6.2 2.61 6.2 5.87zm379.92-7.18c0 18.92-15.01 34.24-33.59 34.24-18.58 0-33.92-15.32-33.92-34.24 0-18.26 15.34-33.59 33.92-33.59 18.58 0 33.59 15.33 33.59 33.59z"
        />
      </svg>
    </div>
  );
}
