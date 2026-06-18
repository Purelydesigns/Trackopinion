"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const pins = [
  { name: "Canada",    code: "ca", coordinates: [-96,  60] as [number, number] },
  { name: "USA",       code: "us", coordinates: [-100, 38] as [number, number] },
  { name: "UK",        code: "gb", coordinates: [-2,   54] as [number, number] },
  { name: "Germany",   code: "de", coordinates: [10,   51] as [number, number] },
  { name: "India",     code: "in", coordinates: [78,   22] as [number, number] },
  { name: "Australia", code: "au", coordinates: [134, -25] as [number, number] },
];

export default function GlobalReach({ hideHeading = false, cardMode = false }: { hideHeading?: boolean; cardMode?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<number | null>(null);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cycleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isManual = useRef(false);

  /* Auto-cycle through dots once section is in view */
  useEffect(() => {
    if (!inView) return;

    let index = 0;

    const show = () => {
      if (isManual.current) return;
      setActive(index);
      index = (index + 1) % pins.length;
    };

    // Start after a short delay
    autoRef.current = setTimeout(() => {
      show();
      cycleRef.current = setInterval(show, 1800);
    }, 800);

    return () => {
      if (autoRef.current) clearTimeout(autoRef.current);
      if (cycleRef.current) clearInterval(cycleRef.current);
    };
  }, [inView]);

  const handleClick = (i: number) => {
    // Pause auto cycle on manual interaction
    isManual.current = true;
    if (cycleRef.current) clearInterval(cycleRef.current);
    if (autoRef.current) clearTimeout(autoRef.current);

    setActive(i);

    // Resume auto cycle after 4s
    autoRef.current = setTimeout(() => {
      isManual.current = false;
      let index = (i + 1) % pins.length;
      const show = () => {
        setActive(index);
        index = (index + 1) % pins.length;
      };
      show();
      cycleRef.current = setInterval(show, 1800);
    }, 4000);
  };

  const inner = (
    <>
      {/* Sentinel for useInView — must have layout size for IntersectionObserver */}
      <div ref={ref} style={{ height: 1, width: "100%", marginBottom: -1 }} aria-hidden />

      {/* Heading inside container */}
      <div className={cardMode ? "" : "max-w-7xl mx-auto px-6"}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`text-center mb-6 ${hideHeading ? "hidden" : ""}`}
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-gray-900 mb-4">
            Global Reach
          </h2>
          <p className="text-gray-900 text-base leading-8 font-medium max-w-2xl mx-auto">
            Take your research experience to a higher level with 4.5 million
            active panel members worldwide and our team's caliber and expertise.
          </p>
        </motion.div>
      </div>

      {/* Map inside container */}
      <div className={cardMode ? "" : "max-w-7xl mx-auto px-6"}>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full"
      >
        <ComposableMap
          projection="geoNaturalEarth1"
          projectionConfig={{ scale: 185, center: [10, 15] }}
          width={980}
          height={440}
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          <defs>
            <pattern
              id="dotPattern"
              x="0" y="0"
              width="5" height="5"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2.5" cy="2.5" r="1.4" fill="rgba(0,0,0,0.16)" />
            </pattern>
          </defs>

          <Geographies geography={GEO_URL}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: { fill: "url(#dotPattern)", stroke: "transparent", outline: "none" },
                    hover:   { fill: "url(#dotPattern)", outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {pins.map((pin, i) => (
            <Marker key={i} coordinates={pin.coordinates}>
              <g onClick={() => handleClick(i)} style={{ cursor: "pointer" }}>
                <circle r={6} fill="#f97316" opacity={0.3}>
                  <animate attributeName="r"       from="5"  to="12" dur="1.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.3" to="0" dur="1.6s" repeatCount="indefinite" />
                </circle>
                <circle r={5} fill="#f97316" stroke="#fff" strokeWidth={1.5} />
              </g>

              {active === i && (
                <foreignObject x={-60} y={-72} width={120} height={68}>
                  <div
                    style={{
                      background: "white",
                      borderRadius: "12px",
                      boxShadow: "0 6px 24px rgba(0,0,0,0.15)",
                      padding: "8px 12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      whiteSpace: "nowrap",
                      border: "1px solid #f3f4f6",
                      position: "relative",
                    }}
                  >
                    {/* Circular flag image */}
                    <img
                      src={`https://flagcdn.com/w40/${pin.code}.png`}
                      alt={pin.name}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        border: "2px solid #e5e7eb",
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "#f97316" }}>
                      {pin.name}
                    </span>
                    {/* Arrow */}
                    <div style={{
                      position: "absolute",
                      bottom: "-8px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 0,
                      height: 0,
                      borderLeft: "8px solid transparent",
                      borderRight: "8px solid transparent",
                      borderTop: "8px solid white",
                    }} />
                  </div>
                </foreignObject>
              )}
            </Marker>
          ))}
        </ComposableMap>
      </motion.div>
      </div>

      {/* Know more button inside container */}
      {!cardMode && (
        <div className="flex justify-center mt-6">
          <Link
            href="/contact"
            className="bg-primary text-white text-sm font-bold px-10 py-4 rounded-lg hover:bg-accent transition-all duration-300 shadow hover:-translate-y-0.5"
          >
            KNOW MORE
          </Link>
        </div>
      )}
    </>
  );

  if (cardMode) return inner;

  return (
    <section className="bg-section py-16 overflow-hidden">
      {inner}
    </section>
  );
}
