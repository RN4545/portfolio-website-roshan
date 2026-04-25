export const personalInfo = {
  name: "Roshan",
  role: "Flutter & Mobile Developer",
  tagline: "Crafting seamless mobile experiences",
  bio: "I build production-grade Flutter apps with clean architecture, GetX state management, and a sharp eye for UI/UX. Passionate about turning complex requirements into elegant, performant mobile solutions.",
  location: "Navi Mumbai, India",
  email: "roshannakate24@gmail.com",
  github: "https://github.com/RN4545",
  linkedin: "https://www.linkedin.com/in/roshan-nakate-0311b4286?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  resume: "https://docs.google.com/document/d/1A0dsl0rORzuK691GtgAcS5-WymGAdg0p/edit?usp=sharing&ouid=118178767843594791576&rtpof=true&sd=true",
  available: true,
};

export const skills = [
  { category: "Mobile", items: ["Flutter", "Dart", "Android", "iOS", "GetX",] },
  { category: "Architecture", items: ["Clean Architecture", "Repository Pattern", "MVVM", "Getx"] },
  { category: "Tools", items: ["VS Code", "Android Studio", "Git", "Figma", "Postman","SSMS"] },
];

export const projects = [
  {
    id: "acpl-consignment-tracking",
    title: "ACPL Consignment Tracking",
    description: "Logistics & shipment tracking app with real-time vehicle tracking, collection enquiry, and route management using Google Maps integration.",
    tags: ["Flutter", "GetX", "Flutter Maps", "REST API"],
    color: "#64c8ff",
    year: "2025",
    type: "Mobile App",
  },
  {
    id: "etrans-branch",
    title: "e-transBranch",
    description: "Enterprise branch application featuring biometric face enrollment, facial recognition login, and multi-frame camera consent flows.EPOD Section POD upload logic flow",
    tags: ["Flutter", "Biometrics", "Camera", "GetX"],
    color: "#ff6b9d",
    year: "2025",
    type: "Logistic App",
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description: "Modern portfolio built with Next.js 14, featuring smooth animations, dark theme, and responsive design across all devices.",
    tags: ["Next.js", "TypeScript", "CSS", "Animation"],
    color: "#a78bfa",
    year: "2025",
    type: "Web",
  },

    {
    id: "society-go",
    title: "Society-Go",
    description: "Visitor Management at Society Gate for check-in check-out process,and maintainance payment through app",
    tags: ["Flutter", "Dart", "Flutter Plugins", "Getx"],
    color: "#a78bfa",
    year: "2024",
    type: "Mobile App",
  },
   {
    id: "payment-sdk",
    title: "Payment SDK",
    description: "This sdk is work as payment intiator for payment process. User can make payement through UPI app, QR, Collect Request(upi id).",
    tags: ["Flutter,Dart,Getx,Native Plugin"],
    color: "#a78bfa",
    year: "2024",
    type: "Mobile App",
  },
];

export const experience = [
  {
    company: "ACPL (Avinash Cargo Pvt. Ltd)",
    role: "Flutter Developer (IT-Executive)",
    period: "2025 — Present",
    domain: "Logistics",
    desc: "Building production Flutter apps for logistics and enterprise clients.",
    highlights: [
      "Built ACPL Tracking app with real-time vehicle tracking",
      "Implemented biometric face enrollment & login",
      "GetX architecture with repository pattern",
      "REST API integration using Dio",
    ],
  },
  {
    company: "Jodetex Pvt. Ltd",
    role: "Jr. Flutter Developer",
    period: "August 2024 — May 2025",
    domain: "Fintech",
    desc: "Worked across multiple fintech products in Flutter.",
    highlights: [
      "Built a Payment SDK for external client integration",
      "Researched SDK invocation from Flutter & native apps",
      "Contributed to SocietyGo & Guard (live on PlayStore)",
      "Worked on a bank super app with multiple modules",
      "Debugged and resolved critical production errors",
    ],
  },
];
