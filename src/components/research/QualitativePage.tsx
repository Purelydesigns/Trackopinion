import ResearchPageLayout, { ResearchPageProps } from "./ResearchPageLayout";

const content: ResearchPageProps = {
  banner: {
    title: "Qualitative Market Research",
    subtitle: "Improve Your Offering with Qualitative Market Research",
  },
  factsHeading: "Facts that Reveal the Reasons Behind Users' Emotions",
  factsDesc: "Learn your audience's opinions in depth through complex and elaborate methods like focus group interviews, diary studies, and online surveys with open-ended questions.",
  sections: [
    {
      heading: "Qualitative Market Research Methods",
      side: "left",
      mockup: "toggle",
      paragraphs: [
        "Qualitative research companies help you explore hidden opinions inside your users' hearts. What numbers can't reveal, we can.",
        "At Track Opinion, we use diverse methods based on your project needs. Digital discussions, physical communities, web-enabled or real-time focus groups, and in-person or CATI interviews are some primary methods qualitative research agencies in India deploy.",
      ],
    },
    {
      heading: "More Than Numbers",
      side: "right",
      mockup: "cards",
      paragraphs: [
        "As a qualitative research agency, we believe market research is bigger than numbers. That's why we analyze the 'whys and hows' rather than just 'what and how many' through user behavior.",
        "We only vet and onboard panelists with validated profiles and at least 6 months of experience. Our panel members' psychographic and demographic data reflects your audience segment.",
      ],
    },
    {
      heading: "Benefits of Qualitative Research",
      side: "left",
      mockup: "circles",
      paragraphs: [
        "Qualitative data offers motivation behind user behavior, mindsets, and influences. These methods, alongside social media listening, help qualitative research companies learn about users' needs, demands, pain points, and underlying granular nuances.",
        "With thoughtfully curated open-ended questions, you can now extract the unexplored that quantitative data can't.",
      ],
    },
  ],
  capabilities: [
    {
      title: "End-to-End Consulting",
      desc: "Right from understanding your goals to generating insights that help your business decisions, we have your back throughout the qualitative market research.",
    },
    {
      title: "Industry Agnostic",
      desc: "Whichever is your industry, our experience is wide. And based on your company's size — start-up, mid-scale, or enterprise — we design our market research approach.",
    },
    {
      title: "Deeper Data",
      desc: "Qualitative research thrives on data that touches the depths. And we offer that along with precision in stats collection, analytics, and your business insights.",
    },
    {
      title: "Translation Facility",
      desc: "Need data collection at remote locations? Don't let regional and unfamiliar languages become a hurdle. Obtain translation services in your qualitative market research.",
    },
    {
      title: "Goals-Based Methodology",
      desc: "Your market research agenda defines which method we'd use. During our project consultation phase, we understand your needs and suggest an apt methodology.",
    },
    {
      title: "Panel Vetting",
      desc: "For qualitative market research, we demand a minimum of 6 months past participation from panelists as the industry standard. Might vary from B2C to healthcare & brands.",
    },
  ],
  stepsHeading: "Project Management",
  stepsSubheading: "A dedicated team available around the clock",
  steps: [
    {
      num: "1",
      title: "Project Consultation",
      subtitle: "You speak, we listen.",
      desc: "We seek a detailed discussion on your project to understand your qualitative data needs that should meet end goals.",
    },
    {
      num: "2",
      title: "Team Allocation",
      subtitle: "You ask, we provide.",
      desc: "You get a research team with a project manager, expert research consultants, survey programmers, and data analysts.",
    },
    {
      num: "3",
      title: "Project Execution",
      subtitle: "You want, we serve.",
      desc: "We take pride in timely delivery while aiming to collect precise data as a qualitative market research firm in India.",
    },
  ],
  stats: [
    { value: "15+",  label: "Years of Expertise"    },
    { value: "100+", label: "Clients"               },
    { value: "30+",  label: "Market Covered"        },
    { value: "4.7M", label: "Active Panellists"     },
    { value: "20K+", label: "Project Completed"     },
  ],
  faqs: [
    {
      q: "How can qualitative research benefit Business?",
      a: "Qualitative market research helps capture deeper human emotions that an MCQ on the survey form can't. Such research goes beyond the binary or limited predefined choices and seeks users' inputs through open-ended questions.\n\nInstead of focusing on the \"what and when\", qualitative research stresses more on \"why and how\", which invites longer responses from panelists.",
    },
    {
      q: "Can qualitative research be combined with quantitative research?",
      a: "Yes — combining both is called mixed-methods research. Qualitative methods explore the \"why\" behind behaviors, while quantitative methods confirm findings at scale. Together they provide a comprehensive view: depth from qualitative insight, breadth and statistical confidence from quantitative data.",
    },
    {
      q: "What is the difference between qualitative & quantitative market research?",
      a: "Qualitative research is exploratory in nature — it uses open-ended questions, interviews, and focus groups to understand motivations, perceptions, and emotions. Quantitative research is numerical — it uses structured surveys and statistical analysis to measure and generalize findings across large populations.",
    },
    {
      q: "How is qualitative data collected?",
      a: "Qualitative data is collected through methods such as in-depth interviews (IDIs), focus group discussions (FGDs), ethnographic studies, diary studies, online communities, and open-ended survey questions. Each method is chosen based on your research objectives and target audience profile.",
    },
  ],
};

export default function QualitativePage() {
  return <ResearchPageLayout {...content} />;
}
