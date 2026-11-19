// Static copy from the Amader Agency Brand Prospectus. Edit freely.
// Services and portfolio are NOT here: they come from the API (admin panel).

export const siteConfig = {
  name: "Amader Agency",
  tagline: "Your One-Stop Business Solution Partner",
  description:
    "Amader Agency is a full-stack marketing agency: digital marketing, creative design, video production, web development and SEO from one coordinated team.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, ""),
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const processSteps = [
  { title: "Discovery", text: "We understand your business, audience, challenges and objectives." },
  { title: "Strategy", text: "We develop a clear strategy and execution roadmap." },
  {
    title: "Creation",
    text: "Our specialized team creates the required designs, videos, content and digital solutions.",
  },
  { title: "Approval", text: "We share the work, collect feedback and make agreed revisions." },
  { title: "Delivery", text: "We execute and deliver the approved project." },
  {
    title: "Improvement",
    text: "Where applicable, we monitor performance and identify opportunities to improve.",
  },
];

export const whyPoints = [
  { title: "One-stop solution", text: "Multiple creative and digital services from one agency." },
  { title: "Specialized teams", text: "Dedicated expertise across different service departments." },
  {
    title: "Strategic approach",
    text: "Every project begins with understanding the business objective.",
  },
  {
    title: "Quality commitment",
    text: "We focus on professional work without compromising quality.",
  },
  { title: "Client satisfaction", text: "Your satisfaction remains our first priority." },
];

export const industries = [
  "small and medium enterprises",
  "startups",
  "F-commerce",
  "e-commerce",
  "educational institutions",
  "local businesses",
  "service-based businesses",
];

export const philosophy = [
  { title: "Creativity", text: "Creative thinking makes brands memorable." },
  { title: "Strategy", text: "Every creative decision should have a purpose." },
  {
    title: "Commitment",
    text: "We believe in responsibility, quality and delivering on our promises.",
  },
  { title: "Growth", text: "Your business growth is the reason behind our work." },
];

export const budgetOptions = [
  "Under ৳10,000",
  "৳10,000 - ৳30,000",
  "৳30,000 - ৳1,00,000",
  "Above ৳1,00,000",
  "Not sure yet",
];
