import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { insuranceTypes } from "@/lib/insurance";
import { locations } from "@/lib/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/quote", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/locations", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/licensing", priority: 0.5, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const insuranceRoutes = insuranceTypes.map((t) => ({
    path: `/insurance/${t.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  const locationRoutes = locations.map((l) => ({
    path: `/locations/${l.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  return [...staticRoutes, ...insuranceRoutes, ...locationRoutes].map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
