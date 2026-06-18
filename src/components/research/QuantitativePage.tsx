import ResearchPageLayout, { ResearchPageProps } from "./ResearchPageLayout";

const content: ResearchPageProps = {
  banner: {
    title: "Quantitative Market Research",
    subtitle: "Make Data-Driven Decisions with Quantitative Market Research",
  },
  factsHeading: "Numbers that Tell the Complete Story of Your Market",
  factsDesc: "Measure, validate, and scale your business decisions using structured surveys, statistical analysis, and large-sample data collection across 30+ global markets.",
  sections: [
    {
      heading: "Quantitative Market Research Methods",
      side: "left",
      mockup: "toggle",
      paragraphs: [
        "Quantitative research methods help you measure market trends, customer satisfaction, and brand perception at scale. What opinions suggest, numbers confirm.",
        "At Track Opinion, we deploy online surveys, telephonic interviews, panel-based data collection, and longitudinal tracking studies to capture statistically significant insights for your business decisions.",
      ],
    },
    {
      heading: "Beyond the Surface",
      side: "right",
      mockup: "cards",
      paragraphs: [
        "As a quantitative research firm, we believe data should drive decisions. We go beyond simple counts — applying regression analysis, segmentation, and predictive modelling to surface actionable market intelligence.",
        "Our rigorously vetted panel of 4.7 million active members ensures your survey data reflects real market demographics — validated, profiled, and representative of your target audience.",
      ],
    },
    {
      heading: "Benefits of Quantitative Research",
      side: "left",
      mockup: "circles",
      paragraphs: [
        "Quantitative data provides measurable evidence for market size, customer preferences, competitive positioning, and purchase intent. It reduces guesswork and replaces assumptions with statistically validated findings.",
        "With large-scale structured surveys and advanced analytics, you can segment audiences, track trends over time, and make high-confidence business decisions backed by real numbers.",
      ],
    },
  ],
  capabilities: [
    {
      title: "Large-Scale Surveys",
      desc: "Reach thousands of respondents across geographies and demographics simultaneously. Our panel ensures fast field time and high completion rates for your quantitative studies.",
    },
    {
      title: "Statistical Analysis",
      desc: "From descriptive statistics to multivariate regression, our analysts apply the right techniques to extract reliable, actionable insights from your survey data.",
    },
    {
      title: "Market Segmentation",
      desc: "Identify and profile distinct customer groups based on behavior, attitude, and demographics. Use segmentation findings to tailor products, messaging, and strategy.",
    },
    {
      title: "Tracking Studies",
      desc: "Monitor brand health, customer satisfaction, and market trends over time with consistent, repeatable survey waves that reveal how perceptions shift across periods.",
    },
    {
      title: "Cross-Tab Reporting",
      desc: "Slice your data by any demographic or behavioral variable. Our cross-tabulation reports help you understand differences between audience segments at a glance.",
    },
    {
      title: "Validated Panel",
      desc: "Every panelist is verified against strict quality criteria including profile validation, duplicate detection, and minimum participation standards to guarantee data integrity.",
    },
  ],
  stepsHeading: "Project Management",
  stepsSubheading: "A dedicated team available around the clock",
  steps: [
    {
      num: "1",
      title: "Project Consultation",
      subtitle: "You speak, we listen.",
      desc: "We align on your research objectives, target audience, sample size, and methodology to ensure the study design meets your business goals.",
    },
    {
      num: "2",
      title: "Team Allocation",
      subtitle: "You ask, we provide.",
      desc: "A dedicated project manager, survey programmer, field executive, and data analyst are assigned to ensure seamless execution from start to finish.",
    },
    {
      num: "3",
      title: "Project Execution",
      subtitle: "You want, we serve.",
      desc: "We field the survey, monitor data quality in real time, and deliver clean, weighted datasets with full reporting and actionable recommendations.",
    },
  ],
  stats: [
    { value: "15+",  label: "Years of Expertise" },
    { value: "100+", label: "Clients"            },
    { value: "30+",  label: "Market Covered"     },
    { value: "4.7M", label: "Active Panellists"  },
    { value: "20K+", label: "Project Completed"  },
  ],
  faqs: [
    {
      q: "What is quantitative market research?",
      a: "Quantitative market research is a structured approach to data collection that uses numerical data, closed-ended surveys, and statistical analysis to measure market trends, consumer behavior, and brand performance. It answers questions like \"how many\", \"how often\", and \"to what extent\" — giving businesses statistically reliable, generalizable insights.",
    },
    {
      q: "How large a sample size do I need for quantitative research?",
      a: "Sample size depends on your target population size, desired confidence level, margin of error, and subgroup analysis requirements. As a rule of thumb, a minimum of 400 responses provides a 95% confidence level with a ±5% margin of error for a general population study. We help you determine the right sample for your specific objectives.",
    },
    {
      q: "What is the difference between qualitative and quantitative market research?",
      a: "Qualitative research explores motivations and emotions through open-ended methods like interviews and focus groups. Quantitative research measures and quantifies behavior and attitudes through structured surveys and statistical analysis. Qualitative gives depth; quantitative gives breadth. Many projects benefit from combining both approaches.",
    },
    {
      q: "How long does a quantitative research project take?",
      a: "Timelines vary by complexity, but a standard online quantitative study — including questionnaire design, programming, fielding, data cleaning, and reporting — typically takes 2 to 4 weeks. Complex multi-market or longitudinal studies may take longer. We provide a detailed timeline during the project consultation phase.",
    },
  ],
};

export default function QuantitativePage() {
  return <ResearchPageLayout {...content} />;
}
