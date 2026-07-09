"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import SiteCard from "@/components/ui/SiteCard";

const testimonials = [
  {
    company: "Nielsen",
    accent: "#d4001a",
    name: "Sarah Mitchell",
    role: "VP of Research",
    review:
      "Does exactly what it says. Clear to read and understand. This is now the second time we've used the platform and would certainly recommend it.",
  },
  {
    company: "Kantar",
    accent: "#e4003a",
    name: "Jennifer Black",
    role: "Head of Insights",
    review:
      "Love the ease and efficiency. Very informative and insightful. The added compliance checks are a great bonus. Sweet tool — love it, highly recommend.",
  },
  {
    company: "Ipsos",
    accent: "#00529b",
    name: "Phillip Colligan",
    role: "Research Director",
    review:
      "This platform is excellent if you need to identify market opportunities. If you have any issues, their customer service is quite helpful and responsive.",
  },
  {
    company: "GfK",
    accent: "#0047bb",
    name: "Leslie Hartman",
    role: "Senior Analyst",
    review:
      "The data quality and turnaround time exceeded our expectations. Track Opinion has become our go-to partner for global panel research.",
  },
  {
    company: "Dynata",
    accent: "#7b2d8b",
    name: "Mark T.",
    role: "Managing Director",
    review:
      "Excellent market research platform. The data quality is outstanding and the team is very professional and responsive.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-section py-16">
      <div className="site-container px-6">

        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-center text-gray-900 mb-8">
          What Our Client Say
        </h2>

        <div className="relative px-8 sm:px-12">

          <button
            id="testimonial-prev"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary transition-colors duration-200 shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            id="testimonial-next"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary transition-colors duration-200 shadow-md"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{ prevEl: "#testimonial-prev", nextEl: "#testimonial-next" }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
            slidesPerView={1}
            spaceBetween={24}
            breakpoints={{
              768:  { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="!pt-2 !pb-8 !px-2 !items-stretch"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i} className="!h-auto">
                <SiteCard className="h-full">
                  <div className="p-7 flex flex-col h-full">

                    {/* Brand wordmark */}
                    <div className="mb-5">
                      <span
                        className="text-2xl font-black tracking-tight"
                        style={{ color: t.accent }}
                      >
                        {t.company}
                      </span>
                    </div>

                    {/* Review */}
                    <p className="text-gray-600 text-base leading-8 font-medium flex-1 mb-6">{t.review}</p>

                    {/* Author */}
                    <div className="border-t border-gray-200 pt-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <span className="text-white text-xs font-black">{t.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-bold text-primary text-sm leading-none mb-0.5">{t.name}</p>
                        <p className="text-gray-400 text-xs">{t.role}</p>
                      </div>
                    </div>

                  </div>
                </SiteCard>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </div>
    </section>
  );
}
