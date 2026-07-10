import type { ResumeData } from '@/types/resume';
import { normalizeResumeData } from '@/lib/resumeData';

export const defaultResumeData: ResumeData = normalizeResumeData({
  metadata: {
    language: 'en',
    template_id: 'atlas_classic_v1_en',
    skill_profile: 'engineering',
  },
  basics: {
    name: 'John Doe',
    title: 'Senior Software Engineer',
    targetRole: 'Senior Full-Stack Engineer',
    targetCompany: 'Product-led SaaS companies',
    targetJobDescription: '',
    email: 'john.doe@example.com',
    phone: '+1 312 555 0147',
    location: 'United States, Chicago / Remote',
    city: 'Chicago',
    country: 'United States',
    remoteFriendly: true,
    urls: {
      linkedin: 'linkedin.com/in/johndoe-dev',
      github: 'github.com/johndoe-dev',
      portfolio: 'johndoe.dev',
    },
    summary:
      'Senior software engineer with 8+ years of experience building web applications, internal platforms, and customer-facing SaaS products. Strong track record in TypeScript, React, Node.js, and cloud infrastructure, with consistent results in improving performance, delivery speed, and developer productivity.',
    showSummary: true,
  },
  experience: [
    {
      company: 'Northstar Labs',
      position: 'Senior Software Engineer',
      location: 'Chicago / Remote',
      startDate: '2022-04',
      endDate: 'present',
      responsibilities: [
        'Built customer-facing product features across a React and Node.js stack.',
        'Led delivery of backend and frontend work for workflow automation and analytics initiatives.',
      ],
      highlights: [
        'Reduced average page load time by 38% after redesigning dashboard queries and trimming unused client bundles.',
        'Delivered a self-serve workflow builder adopted by more than 1,200 accounts in the first year.',
        'Cut production incident volume by 29% by improving observability and release checklists.',
      ],
    },
    {
      company: 'BrightWave Software',
      position: 'Software Engineer',
      location: 'Austin, TX',
      startDate: '2019-01',
      endDate: '2022-03',
      responsibilities: [
        'Developed product features, APIs, and internal tooling for a B2B analytics platform.',
        'Worked with product and design teams to ship roadmap items from discovery through rollout.',
      ],
      highlights: [
        'Launched a reporting module that increased weekly active admin usage by 24% within 6 months.',
        'Replaced a legacy CSV import flow with a queue-based service, reducing failed imports by 63%.',
        'Introduced shared TypeScript contracts that cut integration defects during QA by 31%.',
      ],
    },
    {
      company: 'Cedar Stack',
      position: 'Junior Software Engineer',
      location: 'Madison, WI',
      startDate: '2017-06',
      endDate: '2018-12',
      responsibilities: [
        'Supported web application development for small and mid-sized clients.',
        'Implemented UI components, REST endpoints, bug fixes, and automated tests.',
      ],
      highlights: [
        'Built reusable React form components that reduced implementation time for new workflows by about 30%.',
        'Improved coverage across core modules from 41% to 68% over three release cycles.',
      ],
    },
  ],
  education: [
    {
      institution: 'University of Wisconsin-Madison',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Madison, WI',
      startDate: '2013-09',
      endDate: '2017-05',
      gpa: '3.7 / 4.0',
      coursework: ['Data Structures', 'Database Systems', 'Operating Systems', 'Human-Computer Interaction'],
    },
  ],
  skills: [
    {
      category: 'Programming Languages',
      keywords: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'Bash'],
    },
    {
      category: 'Frontend',
      keywords: ['React', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS', 'Vite'],
    },
    {
      category: 'Backend',
      keywords: ['Node.js', 'Express', 'REST APIs', 'PostgreSQL', 'Redis'],
    },
    {
      category: 'Cloud & DevOps',
      keywords: ['AWS', 'Docker', 'GitHub Actions', 'Terraform', 'Sentry', 'Datadog'],
    },
  ],
  projects: [
    {
      name: 'PulseOps Incident Dashboard',
      role: 'Lead Engineer',
      organization: 'Northstar Labs',
      startDate: '2023-02-01',
      endDate: '2023-09-30',
      period: '2023-02-01 - 2023-09-30',
      description:
        'Operational dashboard for incident visibility, service health tracking, and on-call reporting across engineering teams.',
      url: '',
      keywords: ['React', 'Node.js', 'PostgreSQL', 'Sentry', 'Charting'],
      highlights: [
        'Reduced manual status reporting from about 4 hours to less than 45 minutes per week.',
      ],
    },
    {
      name: 'Multi-tenant Data Import Pipeline',
      role: 'Backend Engineer',
      organization: 'BrightWave Software',
      startDate: '2020-05-01',
      endDate: '2020-11-30',
      period: '2020-05-01 - 2020-11-30',
      description:
        'Scalable ingestion service for customer CSV and API imports with validation, retry handling, and tenant-aware processing.',
      url: '',
      keywords: ['Node.js', 'Queues', 'PostgreSQL', 'AWS SQS', 'Observability'],
      highlights: [
        'Lowered failed import rates by 63% and improved support turnaround with clear validation feedback.',
      ],
    },
  ],
  languages: [
    {
      language: 'English',
      fluency: 'Native or bilingual proficiency',
    },
    {
      language: 'Spanish',
      fluency: 'Professional working proficiency',
    },
  ],
  certifications: [
    {
      name: 'AWS Certified Developer - Associate',
      issuer: 'Amazon Web Services',
      date: '2023-07-01',
      expires: '2026-07-01',
      status: 'Terminowy',
      details: 'Application development, deployment, monitoring, and security on AWS.',
    },
    {
      name: 'Professional Scrum Master I',
      issuer: 'Scrum.org',
      date: '2021-10-01',
      status: 'Bezterminowy',
      details: 'Scrum principles, facilitation, and delivery practices for cross-functional teams.',
    },
  ],
});
