"use client";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MaisFacil = () => {
  const el = useRef();
  const tl = useRef();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".jet-1", {
      x: 0,
      opacity: 1,
      rotate: "0deg",
      scrollTrigger: {
        trigger: ".item-1",
        // markers: true,
        start: "top 600px",
        end: "bottom 650px",
        scrub: 1,
      },
    });

    return () => {
      gsap.killTweensOf(".jet-1");
    };
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({
          scrollTrigger: {
            trigger: el.current,
            // scrub: true,
            // markers: true,
            start: "top 400px",
            end: "bottom 450px",
          },
        })
        .fromTo(
          "#model-1",
          {
            opacity: 0,
            y: 200,
          },
          {
            opacity: 1,
            y: 0,
            ease: "elastic.out",
            duration: 1,
          }
        )
        .fromTo(
          "#model-2",
          {
            opacity: 0,
            y: 200,
          },
          {
            opacity: 1,
            y: 0,
            ease: "elastic.out",
            duration: 1,
          }
        )
        .fromTo(
          "#model-3",
          {
            opacity: 0,
            y: 200,
          },
          {
            opacity: 1,
            y: 0,
            ease: "elastic.out",
            duration: 1,
          }
        );
    }, el);

    return () => {
      gsap.killTweensOf(".models-item");
    };
  }, []);
  return (
    <main className="bg-blue-400 w-full">
      <section className="flex items-center justify-center h-150 item-1">
        <div className="h-full w-full items-center justify-center flex">
          <Image
            src={"/jet/jet3.png"}
            width={500}
            height={500}
            alt="Jet"
            className="jet-1 translate-x-[-500px] rotate-[130deg] opacity-0"
          />
        </div>
        <div className="h-full w-full flex flex-col pt-10">
          <h1 className="text-xl font-bold">2025 GTI SE</h1>
          <div className="flex flex-col gap-3 mt-8">
            <p>
              A partir de <span className="font-semibold">R$ 103.990</span>
            </p>
            <p className="text-sm">
              Preço sugerido para modelo de entrada. Taxas de transporte e
              preparação do veículo podem variar com base no modelo selecionado.
              *Pacote exibido: GTI SE 130
            </p>
            <button className="flex px-10 py-3 w-fit rounded-3xl bg-amber-200 font-semibold">
              Solicite um orçamento
            </button>
            <button className="flex px-10 py-3 w-fit rounded-3xl bg-amber-200 font-semibold">
              Personalize o seu
            </button>
            <button className="flex px-10 py-3 w-fit rounded-3xl bg-amber-200 font-semibold">
              Encontre um revendedor
            </button>
            <p className="text-sm">
              O GTI SE eleva a aventura com mais conveniência, mais conforto e
              um sistema de som que leva a diversão em família na água a novos
              patamares
            </p>
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center h-150 models-container ">
        <div
          className="flex gap-10 w-full items-center justify-center models-content"
          ref={el}
        >
          <div className="models-item model-1" id="model-1">
            <Image
              src={"/jet/jet3.png"}
              width={250}
              height={250}
              alt="Jet"
              className="jet2 models-items"
            />
          </div>
          <div className="models-item model-2" id="model-2">
            <Image
              src={"/jet/jet2.avif"}
              width={250}
              height={250}
              alt="Jet"
              className="jet3 models-items"
            />
          </div>
          <div className="models-item model-3" id="model-3">
            <Image
              src={"/jet/jet1.png"}
              width={250}
              height={250}
              alt="Jet"
              className="jet4 models-items"
            />
          </div>
        </div>
      </section>
      <section className="h-[500px]"></section>
    </main>
  );
};

export default MaisFacil;
