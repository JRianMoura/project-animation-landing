"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function PathScrollerWithMilestonesFixed({
  carSrc = "/jet/jetup.png",
  carSize = 64,
  pathD = "M495,-40 C 520,100 430,240 520,360 C 610,480 540,660 480,820 C 420,980 520,1200 495,1640",
  strokeColor = "#7C3AED",
  strokeWidth = 10,
  drawLine = true,
  pin = true,
  scrollLength = "+=400%",
  milestones = [
    {
      progress: 0.12,
      side: "left",
      title: "GTI",
      text: "A plataforma GTI possui recursos versáteis que expandem seus horizontes na água. Quer o seu dia consista em passeios animados, esportes de reboque, pesca ou apenas um passeio tranquilo.",
    },
    {
      progress: 0.3,
      side: "right",
      title: "GTI SE",
      text: "O GTI SE eleva a aventura com mais conveniência, mais conforto e um sistema de som que leva a diversão em família na água a novos patamares.",
    },
    {
      progress: 0.5,
      side: "left",
      title: "GTX",
      text: "Uma olhada no GTX e você saberá que ele é capaz de muito mais que levá-lo de um lado para outro. Com a combinação perfeita entre conforto, desempenho e visual, fica difícil encontrar uma razão para terminar o passeio.",
    },
    {
      progress: 0.72,
      side: "right",
      title: "GTX Limited",
      text: "Pilote de maneira única com o conforto, a conveniência e o desempenho do GTX Limited. É o padrão de luxo com potência correspondente.",
    },
    {
      progress: 0.9,
      side: "left",
      title: "RXT-X",
      text: "O RXT-X combina uma atitude de alta octanagem com confiança e conveniência excepcionais, tornando-o a melhor embarcação com desempenho offshore.",
    },
  ],
}) {
  const wrapRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wrap = wrapRef.current;
      const svg = wrap.querySelector("svg");
      const path = svg.querySelector("#motionPath");
      const car = wrap.querySelector(".car-el");
      const cards = gsap.utils.toArray(".ms-card");

      // IMPORTANTE: nenhum ancestral do wrapper deve ter transform/overflow que quebre o pin
      // Ex.: evite transform no container de página. Mantenha overflow: visible neste wrapper.
      // (Se precisar, verifique no DevTools.)

      // Altura real já está garantida via CSS (100svh)
      gsap.set(car, { xPercent: -50, yPercent: -50 });

      const L = path.getTotalLength();
      if (drawLine) {
        gsap.set(path, { strokeDasharray: `${L} ${L}`, strokeDashoffset: L });
      }

      // Estado inicial dos cards: fora do eixo X e invisíveis (mas DENTRO da viewport)
      cards.forEach((el) => {
        const side = (el.getAttribute("data-side") || "left").toLowerCase();
        gsap.set(el, {
          autoAlpha: 0,
          x: side === "left" ? -60 : 60,
          y: 0,
        });
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: scrollLength,
          scrub: 1,
          pin,
          pinSpacing: true,
          anticipatePin: 1,
          // markers: true, // descomente pra debugar
          invalidateOnRefresh: true,
        },
      });

      // Carro segue o path com o scroll
      tl.to(
        car,
        {
          motionPath: {
            path,
            align: path,
            alignOrigin: [0.5, 0.5],
            autoRotate: 90,
            start: 0,
            end: 1,
          },
        },
        0
      );

      // Linha se “desenha” junta (opcional)
      if (drawLine) {
        tl.to(path, { strokeDashoffset: 0 }, 0);
      }

      // Cards aparecem no progresso especificado (0→1), mas SEM sair da viewport
      milestones.forEach((m, i) => {
        const t = gsap.utils.clamp(0, 0.99, m.progress ?? (i + 1) * 0.2);
        const el = wrap.querySelector(`.ms-card[data-idx="${i}"]`);
        if (!el) return;
        const side = (m.side || "left").toLowerCase();

        tl.to(el, { autoAlpha: 1, x: 0, duration: 0.25 }, t)
          .to(el, { y: -8, duration: 0.18 }, t + 0.02)
          .to(el, { y: 0, duration: 0.18 }, t + 0.1);

        // opcional: um leve “enfraquecer” mais adiante, pra dar prioridade ao seguinte
        tl.to(el, { autoAlpha: 0.6, duration: 0.25 }, Math.min(t + 0.18, 0.98));
      });

      // Refresh: mantém coerência no resize
      ScrollTrigger.addEventListener("refreshInit", () => {
        const newL = path.getTotalLength();
        if (drawLine) {
          gsap.set(path, {
            strokeDasharray: `${newL} ${newL}`,
            strokeDashoffset: (1 - tl.progress()) * newL,
          });
        }
      });
      ScrollTrigger.refresh();
    }, wrapRef);

    return () => ctx.revert();
  }, [
    carSrc,
    carSize,
    pathD,
    strokeColor,
    strokeWidth,
    drawLine,
    pin,
    scrollLength,
    milestones,
  ]);

  return (
    <section
      ref={wrapRef}
      className="relative mx-auto w-full max-w-6xl overflow-visible"
      style={{
        height: "100svh", // ocupa a viewport real (iOS friendly)
        minHeight: "100vh",
      }}
    >
      {/* COLUNAS: esquerda e direita visíveis durante o pin */}
      <div className="absolute inset-0 pointer-events-none">
        {/* esquerda */}
        <div className="absolute left-0 top-0 h-full w-[44%] md:w-[40%] flex items-center justify-end pr-6 md:pr-10">
          <div className="relative w-full max-w-[420px] space-y-6">
            {milestones
              .map((m, i) => ({ ...m, i }))
              .filter((m) => (m.side || "left").toLowerCase() === "left")
              .map((m) => (
                <div
                  key={m.i}
                  data-idx={m.i}
                  data-side="left"
                  className="ms-card pointer-events-auto rounded-2xl border border-white/10 bg-purple-600/80 backdrop-blur-sm p-4 md:p-5 shadow-lg"
                >
                  <div className="text-xs uppercase tracking-wider text-white/60">
                    {m.kicker || "• destaque"}
                  </div>
                  <h3 className="mt-1 text-lg md:text-xl font-semibold text-white">
                    {m.title}
                  </h3>
                  <p className="mt-1 text-sm md:text-base text-white/80">
                    {m.text}
                  </p>
                </div>
              ))}
          </div>
        </div>
        {/* direita */}
        <div className="absolute right-0 top-0 h-full w-[44%] md:w-[40%] flex items-center justify-start pl-6 md:pl-10">
          <div className="relative w-full max-w-[420px] space-y-6">
            {milestones
              .map((m, i) => ({ ...m, i }))
              .filter((m) => (m.side || "right").toLowerCase() === "right")
              .map((m) => (
                <div
                  key={m.i}
                  data-idx={m.i}
                  data-side="right"
                  className="ms-card pointer-events-auto rounded-2xl border border-white/10 bg-purple-600/80 backdrop-blur-sm p-4 md:p-5 shadow-lg"
                >
                  <div className="text-xs uppercase tracking-wider text-white/60">
                    {m.kicker || "• destaque"}
                  </div>
                  <h3 className="mt-1 text-lg md:text-xl font-semibold text-white">
                    {m.title}
                  </h3>
                  <p className="mt-1 text-sm md:text-base text-white/80">
                    {m.text}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* CARRO (imagem personalizada) */}
      <Image
        src={carSrc}
        alt="Car"
        width={carSize}
        height={carSize}
        className="car-el absolute z-20 pointer-events-none select-none"
        priority
      />

      {/* LINHA SOLTA (centro) */}
      <svg
        viewBox="0 0 990 1600"
        className="absolute inset-0 w-full h-full z-10"
      >
        <path
          id="motionPath"
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </section>
  );
}
