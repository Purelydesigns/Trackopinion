"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const values = [
  { label: "Honesty",            icon: "/icons/Honesty.svg"             },
  { label: "Customer Obsession", icon: "/icons/Customer_Obsession.svg"  },
  { label: "Think Young",        icon: "/icons/Think_Young.svg"         },
  { label: "Ownership",          icon: "/icons/Ownership.svg"           },
  { label: "Perseverance",       icon: "/icons/Perseverance.svg"        },
];

export default function OurValues() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-section py-16">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900">
            Our Values
          </h2>
          <p className="text-base text-gray-900 font-medium mt-2">What drives us every day</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
          {values.map(({ label, icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              whileHover={{ y: -8, boxShadow: "0 16px 40px rgba(249,115,22,0.18)", scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white rounded-2xl shadow-sm p-5 md:p-8 flex flex-col items-center justify-center text-center cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -6, 6, 0], scale: 1.15 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={icon}
                  alt={label}
                  width={64}
                  height={64}
                  className="mb-4 object-contain"
                />
              </motion.div>
              <p className="text-sm md:text-base font-semibold text-gray-800 text-center whitespace-nowrap">{label}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
