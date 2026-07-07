"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";

const leaders = [
  { name: "Jack Smith",  title: "Chairman",      img: "https://i.pravatar.cc/150?img=11" },
  { name: "Jack Smith",  title: "Vice Chairman", img: "https://i.pravatar.cc/150?img=12" },
  { name: "Jack Smith",  title: "Vice Chairman", img: "https://i.pravatar.cc/150?img=13" },
  { name: "Jack Smith",  title: "Vice Chairman", img: "https://i.pravatar.cc/150?img=14" },
  { name: "Jack Smith",  title: "Vice Chairman", img: "https://i.pravatar.cc/150?img=15" },
  { name: "Jack Smith",  title: "Vice Chairman", img: "https://i.pravatar.cc/150?img=16" },
];

export default function Leadership() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-section py-16">
      <div className="site-container px-6">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900">
            Leadership
          </h2>
        </motion.div>

        <div className="relative px-8 sm:px-12 [overflow-x:clip]">

          <button
            id="leader-prev"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary transition-colors duration-200 shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            id="leader-next"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary transition-colors duration-200 shadow-md"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{ prevEl: "#leader-prev", nextEl: "#leader-next" }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              480:  { slidesPerView: 2, spaceBetween: 20 },
              768:  { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="!py-8 !px-2"
          >
            {leaders.map((leader, i) => (
              <SwiperSlide key={i}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-2xl overflow-hidden bg-primary shadow-lg"
                  >
                    {/* Circular photo */}
                    <div className="flex justify-center pt-8 pb-4">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20">
                        <Image
                          src={leader.img}
                          alt={leader.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      </div>
                    </div>
                    {/* Name & title */}
                    <div className="text-center pb-8 px-4">
                      <p className="text-white font-bold text-base">{leader.name}</p>
                      <p className="text-white/60 text-sm mt-1">{leader.title}</p>
                    </div>
                  </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </div>
    </section>
  );
}
