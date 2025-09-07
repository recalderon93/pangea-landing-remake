import { pl } from "zod/v4/locales";

export default {
  name: "Contact Us",
  title: "Let’s build something meaningful together",
  caption:
    "Small project or big vision — we’re ready to help you make it real.",
  "email-placeholder": "Email address",
  back: "BACK",
  "step-01": {
    title: "1. Contact Information",
    "full-name-placeholder": "Full name",
    "email-placeholder": "Email address",
    "company-name-placeholder": "Company name (Optional)",
    "select-sector-placeholder": "Select sector",
    sector: {
      placeholder: "Select sector",
      options: {
        a: "Automotive",
        b: "E-commerce / Retail",
        c: "Education / EdTech",
        d: "Energy & Utilities",
        e: "Entertainment & Media",
        f: "Finance & Insurance",
      },
    },

    submit: "NEXT",
  },
  "step-02": {
    title: "2. What are you looking for?",
    options: {
      a: "I need a team or expert to build something for me",
      b: "I’m looking to hire a developer or digital talent for my team",
      c: "Not sure yet / I want to explore both",
    },
    submit: {
      "build-something": "Let’s Build Your Project",
      "hire-talent": "Hire Top LATAM Talent",
      "not-sure": "Let’s Get Started",
    },
  },
  "step-03": {
    title: "3. Project Type",
    options: {
      a: "Website",
      b: "App",
      c: "Chatbot / Automation",
      d: "UI/UX Design",
      e: "Custom Software",
      f: "Developer Integration",
      g: "Hiring staff",
      h: "Other:",
    },
    submit: "NEXT",
  },
  "step-04": {
    title: "4. Timeline",
    options: {
      a: "ASAP",
      b: "In 1-2 months",
      c: "In 3+ months",
      d: "Just exploring",
    },
    submit: "NEXT",
  },
  "step-05": {
    title: "5. Tell us more about your needs",
    question:
      "What problem are you trying to solve? Any ideas, goals, or expectations you'd like to share?",
    submit: "NEXT",
  },
  "step-06": {
    title: "6. Talent Needs",
    "fieldset-1": {
      legend: "Duration",
      options: {
        a: "1-3 months",
        b: "3-6 months",
        c: "6+ months",
        d: "Ongoing / not sure",
      },
    },
    "fieldset-2": {
      legend: "Team fit",
      options: {
        a: "Join our team",
        b: "Freelance",
      },
    },
    "fieldset-3": {
      legend: "Location (optional)",
      placeholder: "Select location",
      options: {
        a: "West coast",
        b: "East coast",
        c: "Center US",
        d: "Western Europe",
        e: "LATAM",
        f: "Oceania",
        g: "Asia",
      },
    },
    back: "BACK",
    submit: "NEXT",
  },
  "step-07": {
    title: "7. Attachments (optional)",
    "title-variant": "6. Attachments (optional)",
    caption: "Upload any brief, references, or supporting files",
    back: "BACK",
    submit: "SEND FORM",
  },
  "file-input": {
    "choose-file": "Choose a file or drag & drop here",
    add: "Browse files",
    "add-more": "Add more files",
    "max-file-size": "Max file size:",
    "not-supported": "File type not supported. Accepted:",
    "files-not-added":
      " Some files were not added due to type or size restrictions.",
    more: "more",
  },
  errors: {
    required: {
      fullName: "Full name is required",
      email: "Email is required",
      sector: "Sector is required",
      "contact-reason": "Please provide a reason for contact",
      "project-type": "Please select a project type",
      timeline: "Please select a timeline",
      needs: "Please share more about your needs",
      duration: "Please select a duration",
      "team-fit": "Please select a team fit option",
    },
    "fullName-length": "Full name must be at least 2 characters",
    "email-format": "Please enter a valid email address",
    "files-count": "You can upload up to 3 files",
    "file-size": "Each file must be 10MB or smaller",
  },
};
