"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import { ArrowLeft, ArrowRight, User } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import SiteCard from "@/components/ui/SiteCard";
import SectionHeader from "./ui/SectionHeader";

export interface Testimonial {
  /** Who gave the quote. Stands alone when there is no role or organisation. */
  name: string;
  /** Job title, on its own line under the name. */
  role?: string;
  /** Company or institution, on its own line under the role. */
  org?: string;
  /** One paragraph, or an array for several. */
  review: string | string[];
}

interface Props {
  items?: Testimonial[];
  label?: string;
  heading?: React.ReactNode;
  description?: string;
  /** Unique suffix for the nav-button ids — required if two instances share a page */
  id?: string;
  /** Extra classes for the SectionHeader, e.g. "!mb-0" to tighten the gap */
  className?: string;
  /** Extra classes for the wrapping <section>, e.g. "bg-white" or "py-24" */
  sectionClassName?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "One of Ukraine's leading beverage manufacturers",
    review: [
      "As a market leader in the beverage industry in our home country, understanding the dynamic Indian market is critical to our regional growth strategy. We partnered with Track Opinion for a comprehensive study on the Carbonated Soft Drinks (CSD) and Energy Drinks (ED) category, and the results exceeded our expectations.",
      "Track Opinion demonstrated an exceptional grasp of both quantitative and qualitative methodologies, seamlessly executing a large-scale consumer study across diverse Indian geographies and demographics. What truly set them apart was their ability to go beyond data collection — they delivered deep, actionable insights that helped us decode consumer motivations, taste preferences, brand perceptions, and regional category nuances.",
      "Their team was proactive, highly responsive, and meticulous in their approach. The final insights not only informed our product positioning and marketing plans, but also gave our leadership the confidence to make key investment decisions in the Indian market.",
      "We greatly value this partnership and look forward to collaborating with Track Opinion on future projects.",
    ],
  },
  {
    name: "Matthias Gitschell",
    role: "Director – Audience Measurement",
    org: "Ipsos UK",
    review: [
      "We are working with Track Opinion since now 7 years already. They are contributing a significant part of hard-to-reach respondents for one our major media surveys run across more than 30 markets globally.",
      "They are able to source Senior Business Executives for all markets included in the survey and we have always been delighted about the fast and professional service we get from them.",
    ],
  },
  {
    name: "Teppei Yamashita",
    role: "Managing Director",
    org: "K&L Communications India Pvt. Ltd.",
    review:
      "Track Opinion has supported us greatly to conduct a thorough survey to assess some of the online creatives which was requested by our client. TO has asked for detailed questions before diving into the planning of the survey, helped to customize each form of the survey so that it will be easily understood by the participants. As the result, we had gained a deep knowledge about the target which helped to service our client better. TO has a very supportive and dedicated team which you feel at rest when working on a complicated task together.",
  },
  {
    name: "Molly Telford",
    org: "Toulouse Business School",
    review: [
      "I have been using Track Opinion for few years now, and I must say I am satisfied with their service.",
      "They have a good understanding of our business needs, and have been flexible in meeting our requirements. What is more, able to provide precise feasibility on the projects we need to deliver that helpful in precise planning.",
      "Overall, I would recommend Track Opinion to anyone looking for a reliable market research company.",
    ],
  },
  {
    name: "Founder & Director",
    org: "Global Market Research Firm United Kingdom",
    review: [
      "We’ve had a great experience working with the Track Opinion team across both multi-market surveys and B2B qualitative recruitment projects. The quality of respondents has consistently been impressive, and it’s clear the team genuinely cares about getting things right. Their communication is excellent, they’re proactive in flagging potential challenges and always come forward with practical solutions. They’re friendly, approachable and genuinely easy to work with. A reliable partner that we would happily recommend!",
    ],
  },
];

/**
 * Six lines at `leading-8` (2rem a line). Long enough to carry the opening of a
 * quote, short enough that a 400-word testimonial cannot set the height of the
 * whole row — which is what happened when every quote rendered in full.
 */
const COLLAPSED_MAX = "max-h-48";

function TestimonialCard({
  t,
  onToggle,
}: {
  t: Testimonial;
  /** Lets the carousel react once a card has grown or shrunk. */
  onToggle: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);
  const quoteRef = useRef<HTMLDivElement>(null);
  const paragraphs = Array.isArray(t.review) ? t.review : [t.review];

  /* Whether the quote is actually too long for the collapsed box. A short
     testimonial should not offer a "Read more" that reveals nothing.

     Only meaningful while collapsed: once expanded the box is its full height,
     so scrollHeight and clientHeight match and this would wrongly report that
     the quote fits — taking the "View less" away with it. */
  useEffect(() => {
    if (expanded) return;
    const el = quoteRef.current;
    if (!el) return;

    const measure = () => setClamped(el.scrollHeight > el.clientHeight + 1);
    measure();

    // Re-measure on reflow: the card is narrower at two cards per row than at
    // three, and narrower still on a phone, so the same quote wraps to a
    // different number of lines.
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [expanded]);

  /* Tell the carousel after the DOM has settled, not during the click — Swiper
     measures slide heights and would read the old one. Skipped on mount, where
     nothing has been toggled yet. */
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    onToggle();
  }, [expanded, onToggle]);

  return (
    <SiteCard className="h-full">
      <div className="p-7 flex flex-col h-full">

        {/* Attribution */}
        <div className="flex items-start gap-3 mb-5">
          <User className="w-9 h-9 text-primary shrink-0" strokeWidth={1.75} />
          <div className="min-w-0">
            <p className="font-bold text-primary text-sm leading-snug">{t.name}</p>
            {t.role && <p className="text-gray-500 text-sm leading-snug">{t.role}</p>}
            {t.org && <p className="text-gray-500 text-sm leading-snug">{t.org}</p>}
          </div>
        </div>

        {/* Quote */}
        <div className="relative">
          <div
            ref={quoteRef}
            className={`space-y-4 ${expanded ? "" : `${COLLAPSED_MAX} overflow-hidden`}`}
          >
            {paragraphs.map((para, i) => (
              <p key={i} className="text-gray-600 text-base leading-8 font-medium">
                {i === 0 && "“"}
                {para}
                {i === paragraphs.length - 1 && "”"}
              </p>
            ))}
          </div>

          {/* Softens the cut rather than slicing a line of text in half. */}
          {!expanded && clamped && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
          )}
        </div>

        {(clamped || expanded) && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="self-end mt-4 text-primary text-sm font-bold hover:underline"
            aria-expanded={expanded}
          >
            {expanded ? "View less" : "Read more"}
          </button>
        )}

      </div>
    </SiteCard>
  );
}

export default function Testimonials({
  items = defaultTestimonials,
  label = "",
  heading = <>What Our Client Say</>,
  description = "",
  id = "testimonial",
  className = "",
  sectionClassName = "bg-section py-16",
}: Props) {
  const prevId = `${id}-prev`;
  const nextId = `${id}-next`;
  const swiperRef = useRef<SwiperClass | null>(null);

  /* Expanding a card changes its height, which Swiper has already measured.
     Autoplay stops for good at that point: sliding a quote away from under
     someone who just asked to read all of it is the one thing the button must
     not cause. */
  const handleToggle = useCallback(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    swiper.autoplay?.stop();
    swiper.update();
  }, []);

  return (
    <section className={sectionClassName}>
      <div className="site-container px-6">

        <SectionHeader
          label={label}
          heading={heading}
          description={description}
          theme="light"
          className={className}
        />

        <div className="relative px-8 sm:px-12">

          <button
            id={prevId}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary transition-colors duration-200 shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            id={nextId}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary transition-colors duration-200 shadow-md"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            navigation={{ prevEl: `#${prevId}`, nextEl: `#${nextId}` }}
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
            {items.map((t, i) => (
              <SwiperSlide key={i} className="!h-auto">
                <TestimonialCard t={t} onToggle={handleToggle} />
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </div>
    </section>
  );
}
