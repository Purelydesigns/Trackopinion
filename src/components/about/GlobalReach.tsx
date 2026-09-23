"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import SectionHeader from "../ui/SectionHeader";
import Button from "@/components/ui/Button";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export interface MapPin {
  name: string;
  /** ISO 3166-1 alpha-2, lowercased — what flagcdn expects in its URL. */
  code: string;
  /** [longitude, latitude]. */
  coordinates: [number, number];
}

const DEFAULT_PINS: MapPin[] = [
  { name: "Canada",    code: "ca", coordinates: [-96,  60] },
  { name: "USA",       code: "us", coordinates: [-100, 38] },
  { name: "UK",        code: "gb", coordinates: [-2,   54] },
  { name: "Germany",   code: "de", coordinates: [10,   51] },
  { name: "India",     code: "in", coordinates: [78,   22] },
  { name: "Australia", code: "au", coordinates: [134, -25] },
];

/**
 * Above this many pins the map switches to "dense" styling: smaller dots, a
 * pulse on the highlighted pin only, and a more compact tooltip.
 *
 * A handful of pins can each carry a permanent 12px halo and a 68px-tall
 * tooltip without the map reading as cluttered. Forty cannot — across Europe
 * the halos merge into one blob, and a tooltip that tall is clipped off the top
 * of the viewBox for anything as far north as Norway.
 */
const DENSE_THRESHOLD = 12;

export default function GlobalReach({
  cardMode = false,
  heading,
  description,
  pins = DEFAULT_PINS,
  sectionClassName = "bg-section py-10",
}: {
  cardMode?: boolean;
  heading?: string;
  description?: string;
  pins?: MapPin[];
  /** Lets a page drop the map into its own light/dark rhythm. */
  sectionClassName?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<number | null>(null);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cycleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isManual = useRef(false);

  const dense = pins.length > DENSE_THRESHOLD;
  const count = pins.length;
  // A full rotation of 40-odd pins at the original 1.8s apiece would take over
  // a minute, so the cycle speeds up once the list gets long.
  const cycleMs = dense ? 1100 : 1800;

  /* Auto-cycle through dots once section is in view */
  useEffect(() => {
    if (!inView) return;

    let index = 0;

    const show = () => {
      if (isManual.current) return;
      setActive(index);
      index = (index + 1) % count;
    };

    // Start after a short delay
    autoRef.current = setTimeout(() => {
      show();
      cycleRef.current = setInterval(show, cycleMs);
    }, 800);

    return () => {
      if (autoRef.current) clearTimeout(autoRef.current);
      if (cycleRef.current) clearInterval(cycleRef.current);
    };
  }, [inView, count, cycleMs]);

  /* Warm the flag images up front. Each tooltip only mounts while its pin is
     highlighted, so without this the first pass shows an empty circle where the
     flag should be — the image has not finished downloading before the cycle
     has already moved on. */
  useEffect(() => {
    if (!inView) return;
    for (const pin of pins) {
      const img = new window.Image();
      img.src = `https://flagcdn.com/w40/${pin.code}.png`;
    }
  }, [inView, pins]);

  /** Hold on one pin, then hand control back to the auto-cycle. */
  const pause = (i: number, resumeAfter: number) => {
    isManual.current = true;
    if (cycleRef.current) clearInterval(cycleRef.current);
    if (autoRef.current) clearTimeout(autoRef.current);

    setActive(i);

    autoRef.current = setTimeout(() => {
      isManual.current = false;
      let index = (i + 1) % count;
      const show = () => {
        setActive(index);
        index = (index + 1) % count;
      };
      show();
      cycleRef.current = setInterval(show, cycleMs);
    }, resumeAfter);
  };

  const handleClick = (i: number) => pause(i, 4000);
  // Hovering is the only practical way to read one particular country off a map
  // with this many pins — waiting for the cycle to come round to it is not.
  const handleHover = (i: number) => pause(i, 1500);

  /* Pin and tooltip geometry, tightened up when there are a lot of pins. */
  const activePin = active === null ? null : pins[active] ?? null;

  const dotR = dense ? 3 : 5;
  const flag = dense ? 22 : 36;
  // Tall enough for the card plus the little arrow hanging off its bottom edge;
  // a foreignObject clips anything past its box.
  const tipH = dense ? 48 : 68;
  const tipY = dense ? -48 : -72;
  const tipFont = dense ? 12 : 13;
  const tipPad = dense ? "5px 9px" : "8px 12px";
  /* Room for the flag, the gap, the padding and the label. The widest name in
     the CATI list is "Saudi Arabia"; even so the box stays inside the 980-wide
     viewBox for New Zealand, which sits closest to the right edge. */
  const tipW = (name: string) =>
    Math.max(
      dense ? 96 : 120,
      Math.round(name.length * (dense ? 7 : 8)) + flag + (dense ? 30 : 40),
    );

  const inner = (
    <>
      {/* Sentinel for useInView — must have layout size for IntersectionObserver */}
      <div ref={ref} style={{ height: 1, width: "100%", marginBottom: -1 }} aria-hidden />

      {/* Heading inside container */}
      <div className={cardMode ? "" : "site-container px-6"}>
        <SectionHeader
          label=""
          heading={<>{heading ?? "Global Reach"}</>}
          description={description ?? "Take your research experience to a higher level with 4.5 million active panel members worldwide and our team's caliber and expertise."}
          theme="light"
        />
      </div>

      {/* Map inside container */}
      <div className={cardMode ? "" : "site-container px-6"}>
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
            {({ geographies }) =>
              geographies.map((geo) => (
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
            <Marker key={pin.code} coordinates={pin.coordinates}>
              <g
                onClick={() => handleClick(i)}
                onMouseEnter={() => handleHover(i)}
                style={{ cursor: "pointer" }}
                role="button"
                aria-label={pin.name}
              >
                {/* On a crowded map only the highlighted pin pulses — forty
                    overlapping halos read as noise rather than as reach. */}
                {(!dense || active === i) && (
                  <circle r={dotR + 1} fill="var(--color-primary)" opacity={0.3}>
                    <animate attributeName="r"       from={dotR} to={dotR * 2.4} dur="1.6s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.3" to="0" dur="1.6s" repeatCount="indefinite" />
                  </circle>
                )}
                {/* Invisible disc so the smaller dots stay easy to hit. */}
                {dense && <circle r={9} fill="transparent" />}
                <circle
                  r={dotR}
                  fill="var(--color-primary)"
                  stroke="#fff"
                  strokeWidth={dense ? 1 : 1.5}
                />
              </g>
            </Marker>
          ))}

          {/* The highlighted pin's tooltip is drawn here, after every dot,
              rather than inside the loop. SVG has no z-index — painting order
              is the whole story — so a tooltip emitted alongside its own pin
              ends up underneath every pin that comes later in the list, which
              on the CATI map means dots punching through the label. */}
          {activePin && (
            <Marker coordinates={activePin.coordinates}>
                <foreignObject
                  x={-tipW(activePin.name) / 2}
                  y={tipY}
                  width={tipW(activePin.name)}
                  height={tipH}
                  style={{ pointerEvents: "none" }}
                >
                  <div
                    style={{
                      background: "white",
                      borderRadius: dense ? "10px" : "12px",
                      boxShadow: "0 6px 24px rgba(0,0,0,0.15)",
                      padding: tipPad,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      whiteSpace: "nowrap",
                      border: "1px solid #f3f4f6",
                      position: "relative",
                    }}
                  >
                    {/* Circular flag image. `unoptimized` because flagcdn
                        already serves these at the right size and routing them
                        through the optimizer would add a hop per flag.

                        `loading="eager"` is required, not a preference: the
                        browser's lazy-load heuristic never fires for an <img>
                        inside an SVG <foreignObject>, so with next/image's
                        default the flag is never requested and the tooltip
                        shows an empty circle. Only the highlighted pin mounts a
                        tooltip, so this fetches one flag at a time. */}
                    <Image
                      src={`https://flagcdn.com/w40/${activePin.code}.png`}
                      alt=""
                      aria-hidden
                      width={flag}
                      height={flag}
                      unoptimized
                      loading="eager"
                      style={{
                        width: `${flag}px`,
                        height: `${flag}px`,
                        borderRadius: "50%",
                        border: "2px solid #e5e7eb",
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: `${tipFont}px`, fontWeight: 700, color: "var(--color-primary)" }}>
                      {activePin.name}
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
            </Marker>
          )}
        </ComposableMap>
      </motion.div>
      </div>

      {/* Know more button inside container */}
      {!cardMode && (
        <div className="flex justify-center mt-6">
          <Button href="/about">KNOW MORE</Button>
        </div>
      )}
    </>
  );

  if (cardMode) return inner;

  return (
    <section className={`${sectionClassName} overflow-hidden`}>
      {inner}
    </section>
  );
}
