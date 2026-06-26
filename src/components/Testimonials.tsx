"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    name: "colinandmandy94",
    review:
      "Does exactly what it says. Clear to read and understand. This is now the second iPhone we've used it on and would certainly recommend this app.",
    rating: 5,
  },
  {
    name: "Jennifer Black",
    review:
      "Love the ease and efficiency. Awesome app. Very informative and insightful if wanting to know more about your device. The added breach check is a great bonus. Check any email of they've ever been named in a data breach from years ago. Sweet tool. Love it highly recommend.",
    rating: 5,
  },
  {
    name: "Phillip Colligan",
    review:
      "This app is good if you need to identify certain vulnerabilities on your iPhone. If you have any issues, their customer service was quite helpful and responsive.",
    rating: 5,
  },
  {
    name: "Leslie",
    review:
      "I wish that I could say this app was exactly what I was looking for, but it simply doesn't give me what I need.",
    rating: 4,
  },
  {
    name: "Mark T.",
    review:
      "Excellent market research platform. The data quality is outstanding and the team is very professional and responsive.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-section py-16">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-center text-gray-900 mb-10">
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
            className="!py-6 !px-2 !items-stretch"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i} className="!h-auto">
                <div className="bg-white rounded-2xl p-7 shadow-md h-full flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  {/* Review */}
                  <p className="text-gray-900 text-base leading-8 font-medium mb-6">{t.review}</p>
                  {/* Name */}
                  <p className="font-bold text-primary text-base">{t.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </div>
    </section>
  );
}
