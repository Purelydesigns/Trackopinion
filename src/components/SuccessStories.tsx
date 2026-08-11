"use client";

import LatestReadsSection from "@/components/shared/LatestReadsSection";

export default function SuccessStories() {
  return (
    <LatestReadsSection
      label="Compilation of Our Success Stories"
      heading={<>Research that moved the needle</>}
      description=""
      linkLabel="Read case study →"
      linkHref="/case-studies"
      viewAllHref="/case-studies"
    />
  );
}
