export type Job = {
  slug: string;
  title: string;
  location: string;
  type: string;
  updatedDate: string;
  intro?: string;
  sections: {
    heading: string;
    items: string[];
  }[];
};

export const jobs: Job[] = [
  {
    slug: "assistant-project-manager",
    title: "Assistant Project Manager",
    location: "Noida",
    type: "Full Time",
    updatedDate: "Jun 9, 2025",
    sections: [
      {
        heading: "Key Responsibilities: These include the following. Other duties may be assigned at the discretion of management in the context of the role:",
        items: [
          "Ensure that all projects are completed within budget and in a timely manner",
          "Flexible working hours based on global needs",
          "Ensure clear communication among all groups involved in successful delivery of projects. This includes day-to-day communication with clients; coordination with other client services groups, vendors and partners; and communicating project milestones to internal and external stakeholders.",
          "Assist supervisor on training and mentoring junior members of the team",
          "Communicate effectively with vendors (i.e., panel companies, translation agencies, CATI partners)",
          "Update clients regularly on project progress, Team/ Independent Worker",
          "Ability to work both effectively independently and harmoniously with a team.",
          "Ability to build relationships and work well across functions.",
          "Experience in a collaborative team environment, sharing workload and responsibilities. Time & Project Management",
          "Ability to lead, participate and manage large-scale projects.",
          "Must be able to manage multiple assignments simultaneously with shifting priorities, deadlines and focus and have strong organizational skills.",
        ],
      },
      {
        heading: "Qualifications & Skills:",
        items: [
          "Bachelor's degree in Business, Marketing, or a related field",
          "1–3 years of experience in project management or market research",
          "Proficiency in MS Office (Excel, Word, PowerPoint)",
          "Strong verbal and written communication skills",
          "Ability to manage multiple projects under tight deadlines",
          "Familiarity with survey platforms and research methodologies is a plus",
        ],
      },
    ],
  },
  {
    slug: "project-associate",
    title: "Project Associate",
    location: "Remote",
    type: "Fulltime",
    updatedDate: "Jun 9, 2025",
    sections: [
      {
        heading: "Key Responsibilities:",
        items: [
          "Coordinate day-to-day project activities and ensure timely delivery",
          "Liaise between clients and internal teams to ensure smooth communication",
          "Monitor project timelines and flag delays proactively",
          "Prepare project reports and status updates for stakeholders",
          "Support senior project managers in managing global research projects",
        ],
      },
      {
        heading: "Qualifications & Skills:",
        items: [
          "Bachelor's degree in any relevant discipline",
          "0–2 years of experience in market research or project coordination",
          "Strong organizational and multitasking abilities",
          "Good command over English — written and spoken",
          "Comfortable working in a remote, fast-paced environment",
        ],
      },
    ],
  },
  {
    slug: "marketing-manager",
    title: "Marketing Manager",
    location: "Noida",
    type: "Full Time",
    updatedDate: "Jun 9, 2025",
    sections: [
      {
        heading: "Key Responsibilities:",
        items: [
          "Develop and execute marketing strategies aligned with business goals",
          "Manage digital marketing campaigns across SEO, SEM, email, and social",
          "Oversee brand positioning and messaging consistency",
          "Analyse campaign performance and report on ROI",
          "Collaborate with design and content teams to produce marketing materials",
          "Manage relationships with external agencies and vendors",
        ],
      },
      {
        heading: "Qualifications & Skills:",
        items: [
          "MBA or Bachelor's in Marketing, Communications, or related field",
          "4+ years of experience in B2B or research industry marketing",
          "Proficiency in marketing automation and CRM tools",
          "Strong analytical and data-driven decision-making skills",
          "Experience managing budgets and cross-functional teams",
        ],
      },
    ],
  },
  {
    slug: "research-associate",
    title: "Research Associate",
    location: "Noida",
    type: "Full Time",
    updatedDate: "Jun 9, 2025",
    sections: [
      {
        heading: "Key Responsibilities:",
        items: [
          "Design and program online surveys using research platforms",
          "Conduct qualitative and quantitative data collection",
          "Analyse research data and prepare summary reports",
          "Coordinate with panel vendors and field teams",
          "Ensure data quality and compliance with research standards",
          "Support senior researchers in end-to-end project delivery",
        ],
      },
      {
        heading: "Qualifications & Skills:",
        items: [
          "Bachelor's or Master's in Statistics, Sociology, Psychology, or related field",
          "0–2 years of market research experience",
          "Familiarity with SPSS, Excel, or similar analysis tools",
          "Attention to detail and strong analytical mindset",
          "Good communication skills and ability to work in a team",
        ],
      },
    ],
  },
  {
    slug: "senior-research-associate",
    title: "Senior Research Associate",
    location: "Remote",
    type: "Full Time",
    updatedDate: "Jun 9, 2025",
    sections: [
      {
        heading: "Key Responsibilities:",
        items: [
          "Lead end-to-end quantitative and qualitative research projects",
          "Design complex survey instruments and discussion guides",
          "Manage and mentor junior research associates",
          "Deliver high-quality analysis, insights, and presentations to clients",
          "Coordinate with global panel vendors and CATI centers",
          "Ensure projects are delivered on time and within scope",
        ],
      },
      {
        heading: "Qualifications & Skills:",
        items: [
          "3–5 years of experience in primary market research",
          "Strong proficiency in SPSS, Q, or other analytics software",
          "Experience managing client relationships independently",
          "Excellent report writing and presentation skills",
          "Ability to work across time zones in a remote environment",
        ],
      },
    ],
  },
  {
    slug: "research-associate-intern",
    title: "Research Associate Intern",
    location: "New Delhi",
    type: "Intern",
    updatedDate: "Jun 9, 2025",
    sections: [
      {
        heading: "Key Responsibilities:",
        items: [
          "Assist in programming and testing online surveys",
          "Support data collection and field management activities",
          "Help prepare research reports and presentations",
          "Coordinate with vendors and internal teams as needed",
          "Learn and apply market research methodologies under supervision",
        ],
      },
      {
        heading: "Qualifications & Skills:",
        items: [
          "Currently pursuing or recently completed Bachelor's/Master's degree",
          "Keen interest in market research and data analysis",
          "Basic proficiency in MS Excel and PowerPoint",
          "Strong attention to detail and willingness to learn",
          "Good written and verbal communication skills",
        ],
      },
    ],
  },
];

export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}
