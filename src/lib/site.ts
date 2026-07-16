/**
 * Central site configuration.
 * Everything the business owner is likely to change lives here so the brand,
 * contact details and messaging can be updated in one place.
 */

export const siteConfig = {
  name: "Pittsburgh Insurance Hub",
  shortName: "PGH Insurance Hub",
  tagline: "Pittsburgh's #1 Insurance Matchmaker",
  description:
    "Pittsburgh Insurance Hub connects Pittsburgh families and businesses with trusted, licensed insurance carriers for home, auto, life, health, disability and business coverage — free, fast and local.",
  // Update to your live domain after deploying.
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.pittsburghinsurancehub.com",
  city: "Pittsburgh",
  region: "PA",
  regionName: "Pennsylvania",
  // Owner / licensing — displayed for credibility. Replace with your details.
  licensedAgentName: "Your Name",
  licenseNumber: "PA License #0000000",
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "(412) 952-4046",
  // Public-facing email shown on the site. This is NOT where leads are sent —
  // it's just a generic business inbox visitors can see. Keep it non-personal.
  //
  // NOTE: The PRIVATE lead-notification inbox is intentionally defined only in
  // the server-side API route (src/app/api/lead/route.ts), NOT here, because
  // this config object is also imported by client components and would ship to
  // the browser bundle. Keeping it server-only guarantees it is never exposed.
  email:
    process.env.NEXT_PUBLIC_BUSINESS_EMAIL ||
    "quotes@pittsburghinsurancehub.com",
  address: {
    street: "One PPG Place",
    city: "Pittsburgh",
    region: "PA",
    postalCode: "15222",
    country: "US",
  },
  hours: "Mon–Sat, 8:00 AM – 8:00 PM ET",
  // Neighborhoods / areas served — good for local SEO.
  areasServed: [
    "Pittsburgh",
    "Allegheny County",
    "Mount Lebanon",
    "Cranberry Township",
    "Wexford",
    "Bethel Park",
    "Robinson Township",
    "Monroeville",
    "Ross Township",
    "South Side",
    "Shadyside",
    "Squirrel Hill",
    "Sewickley",
    "McCandless",
    "Upper St. Clair",
  ],
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
  },
  // The concierge's friendly display persona.
  concierge: {
    name: "Sam",
    role: "Insurance Concierge",
  },
} as const;

export type SiteConfig = typeof siteConfig;
