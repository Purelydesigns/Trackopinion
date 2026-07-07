"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowLeft, ArrowRight, BarChart2, Globe, ShieldCheck, TrendingUp, Users } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import SiteCard from "@/components/ui/SiteCard";

const testimonials = [
  {
    name: "colinandmandy94",
    icon: BarChart2,
    label: "Market Research",
    review:
      "Does exactly what it says. Clear to read and understand. This is now the second iPhone we've used it on and would certainly recommend this app.",
  },
  {
    name: "Jennifer Black",
    icon: Globe,
    label: "Global Panel",
    review:
      "Love the ease and efficiency. Awesome app. Very informative and insightful if wanting to know more about your device. The added breach check is a great bonus. Sweet tool. Love it highly recommend.",
  },
  {
    name: "Phillip Colligan",
    icon: ShieldCheck,
    label: "Compliance",
    review:
      "This app is good if you need to identify certain vulnerabilities on your iPhone. If you have any issues, their customer service was quite helpful and responsive.",
  },
  {
    name: "Leslie",
    icon: TrendingUp,
    label: "Analytics",
    review:
      "I wish that I could say this app was exactly what I was looking for, but it simply doesn't give me what I need.",
  },
  {
    name: "Mark T.",
    icon: Users,
    label: "Expert Network",
    review:
      "Excellent market research platform. The data quality is outstanding and the team is very professional and responsive.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-section py-12">
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
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center shrink-0 mb-5">
                      <t.icon className="w-7 h-7 text-primary" strokeWidth={1.6} />
                    </div>
                    {/* Review */}
                    <p className="text-gray-600 text-sm leading-7 font-medium flex-1 mb-6">{t.review}</p>
                    {/* Name */}
                    <div className="border-t border-gray-200 pt-4">
                      <p className="font-bold text-primary text-sm">{t.name}</p>
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
