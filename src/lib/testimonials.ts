export type Testimonial = {
  name: string;
  business: string;
  quote: string;
  reply?: string;
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Rashmi Vitrag Jewellers",
    business: "Jewellery",
    quote:
      "A lot of customers came in through social media — we had a really good show. Thank you to everyone who worked hard behind the scenes.",
    reply: "Thank you, that means a lot. And this is just the beginning.",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Twinkle Sethia Vitrag",
    business: "Jewellery",
    quote:
      "A ₹14L sale closed today, straight out of a video and story post — the client saw it and came in to see the pieces.",
    reply: "Great work team, keep it going.",
    avatar: "https://i.pravatar.cc/150?img=49",
  },
  {
    name: "Sushmitha Yadav",
    business: "Animal Muscle Madness — Gym",
    quote:
      "Two more people converted this week through marketing. Can we also make the reels a bit more colourful and vibrant?",
    reply: "Really good going — and yes, on it.",
    avatar: "https://i.pravatar.cc/150?img=45",
  },
  {
    name: "Thanu",
    business: "Full Metal Alchemist — Gym",
    quote:
      "We got our first social media conversion yesterday morning. Keep up the good work.",
    reply: "That's awesome — congratulations, team.",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Eshu",
    business: "Jewellery",
    quote:
      "Congrats guys — it's a team effort and we're just getting started. 2.3M reach and views in the last couple of days.",
    reply: "Yes ma'am, onward from here.",
    avatar: "https://i.pravatar.cc/150?img=26",
  },
  {
    name: "Makeup Academy Client",
    business: "Beauty & Wellness",
    quote:
      "561 results and 425 contacts in a single month — more enquiries than we expected from ads alone.",
    reply: "Glad it's translating into real enquiries, not just numbers.",
    avatar: "https://i.pravatar.cc/150?img=44",
  },
  {
    name: "Google Review",
    business: "Star Growth Hub — 5.0 ★",
    quote: "Great service and professional team.",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Google Review",
    business: "Star Growth Hub — 5.0 ★",
    quote: "Incredible experience working with them.",
    avatar: "https://i.pravatar.cc/150?img=68",
  },
];

export type CaseStudy = {
  sector: string;
  result: string;
};

export const caseStudies: CaseStudy[] = [
  {
    sector: "Gym & Fitness",
    result:
      "A new account outperformed a previous agency's three-month run inside its first month — 530+ local actions, 117 calls and 552 direction requests generated.",
  },
  {
    sector: "Jewellery",
    result:
      "Campaign reach crossed 2 million in a single month, turning into real store visits and sales conversations.",
  },
  {
    sector: "Beauty & Wellness Academy",
    result:
      "561 measurable results and 425 direct contacts generated for a makeup academy in one month of Google Ads.",
  },
  {
    sector: "Spiritual & Lifestyle Products",
    result:
      "Website purchases climbed from 99 to 352 within two months, with cost-per-purchase trending steadily down.",
  },
];
