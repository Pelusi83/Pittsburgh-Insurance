/**
 * Service-area locations within ~50 miles of Pittsburgh.
 *
 * Each entry generates a dedicated local SEO landing page at /locations/[slug]
 * ("Insurance in {name}, PA") so the site can rank for geo-specific searches
 * across the metro. Content is differentiated per city via `note` and `nearby`
 * to keep pages genuinely useful (not thin/duplicate).
 */

export type Location = {
  slug: string;
  name: string;
  county: string;
  // ~driving miles from downtown Pittsburgh (approximate)
  miles: number;
  // A true, specific local detail used in the page intro (keeps pages unique).
  note: string;
  // Nearby communities / neighborhoods for local relevance + internal context.
  nearby: string[];
};

export const locations: Location[] = [
  {
    slug: "pittsburgh",
    name: "Pittsburgh",
    county: "Allegheny County",
    miles: 0,
    note: "The heart of everything we do — from the historic rowhomes of Lawrenceville and the South Side to Downtown high-rises and the neighborhoods of the East End.",
    nearby: ["Shadyside", "Squirrel Hill", "Lawrenceville", "South Side", "North Side"],
  },
  {
    slug: "mount-lebanon",
    name: "Mount Lebanon",
    county: "Allegheny County",
    miles: 7,
    note: "A sought-after South Hills community known for its tree-lined streets, walkable Uptown, and top-rated schools — and plenty of well-kept older homes that deserve the right coverage.",
    nearby: ["Dormont", "Castle Shannon", "Upper St. Clair", "Scott Township"],
  },
  {
    slug: "upper-st-clair",
    name: "Upper St. Clair",
    county: "Allegheny County",
    miles: 11,
    note: "A family-focused South Hills township with larger homes and long-time residents — a great fit for bundling home and auto and reviewing life coverage.",
    nearby: ["Bethel Park", "Peters Township", "Mount Lebanon"],
  },
  {
    slug: "bethel-park",
    name: "Bethel Park",
    county: "Allegheny County",
    miles: 10,
    note: "One of the South Hills' largest communities, served by the T light rail and a mix of established and newer neighborhoods.",
    nearby: ["Upper St. Clair", "South Park", "Whitehall"],
  },
  {
    slug: "peters-township",
    name: "Peters Township (McMurray)",
    county: "Washington County",
    miles: 17,
    note: "A fast-growing, affluent Washington County community centered on McMurray, with newer construction and highly rated schools.",
    nearby: ["McMurray", "Canonsburg", "Upper St. Clair"],
  },
  {
    slug: "canonsburg",
    name: "Canonsburg",
    county: "Washington County",
    miles: 20,
    note: "A historic borough along I-79 that's become a hub for energy and tech employers, blending small-town charm with new development.",
    nearby: ["Southpointe", "Peters Township", "Cecil Township"],
  },
  {
    slug: "washington",
    name: "Washington",
    county: "Washington County",
    miles: 27,
    note: "The Washington County seat, home to Washington & Jefferson College and a busy commercial corridor along I-70 and I-79.",
    nearby: ["Canonsburg", "Meadowlands", "North Franklin"],
  },
  {
    slug: "cranberry-township",
    name: "Cranberry Township",
    county: "Butler County",
    miles: 20,
    note: "Butler County's booming commercial and residential hub at the crossroads of I-79 and Route 228, with rapid new-home growth.",
    nearby: ["Mars", "Seven Fields", "Wexford", "Zelienople"],
  },
  {
    slug: "wexford",
    name: "Wexford",
    county: "Allegheny County",
    miles: 16,
    note: "An affluent North Hills community around Pine and Marshall Townships, known for newer homes and easy I-79 access.",
    nearby: ["Cranberry Township", "McCandless", "Franklin Park"],
  },
  {
    slug: "mccandless",
    name: "McCandless",
    county: "Allegheny County",
    miles: 12,
    note: "A well-established North Hills township near McKnight Road's shopping corridor, popular with families and commuters.",
    nearby: ["Wexford", "Ross Township", "Franklin Park"],
  },
  {
    slug: "ross-township",
    name: "Ross Township",
    county: "Allegheny County",
    miles: 8,
    note: "A close-in North Hills community along McKnight Road, mixing older neighborhoods with convenient access to Downtown.",
    nearby: ["West View", "McCandless", "Shaler"],
  },
  {
    slug: "shaler",
    name: "Shaler Township",
    county: "Allegheny County",
    miles: 9,
    note: "A North Hills township along Route 8 with a strong sense of community and many long-held family homes.",
    nearby: ["Etna", "Millvale", "Hampton"],
  },
  {
    slug: "franklin-park",
    name: "Franklin Park",
    county: "Allegheny County",
    miles: 15,
    note: "A leafy, upscale North Hills borough with larger lots and newer homes, popular with professionals and families.",
    nearby: ["Wexford", "Marshall Township", "McCandless"],
  },
  {
    slug: "fox-chapel",
    name: "Fox Chapel",
    county: "Allegheny County",
    miles: 10,
    note: "One of the region's most prestigious communities along the Allegheny River, with high-value homes that call for careful coverage review.",
    nearby: ["Aspinwall", "O'Hara Township", "Blawnox"],
  },
  {
    slug: "sewickley",
    name: "Sewickley",
    county: "Allegheny County",
    miles: 13,
    note: "A charming riverfront borough with a walkable historic village and stately homes along the Ohio River.",
    nearby: ["Edgeworth", "Leetsdale", "Moon Township"],
  },
  {
    slug: "moon-township",
    name: "Moon Township",
    county: "Allegheny County",
    miles: 16,
    note: "Home to Pittsburgh International Airport and Robert Morris University, a growing western suburb with easy highway access.",
    nearby: ["Coraopolis", "Robinson Township", "Sewickley"],
  },
  {
    slug: "robinson-township",
    name: "Robinson Township",
    county: "Allegheny County",
    miles: 12,
    note: "A major western retail and business corridor near The Mall at Robinson, with steady residential growth.",
    nearby: ["Moon Township", "Kennedy Township", "Oakdale"],
  },
  {
    slug: "monroeville",
    name: "Monroeville",
    county: "Allegheny County",
    miles: 14,
    note: "A busy eastern-suburb hub along the Parkway East (I-376) and Route 22, with major shopping and medical centers.",
    nearby: ["Penn Hills", "Plum", "Murrysville"],
  },
  {
    slug: "penn-hills",
    name: "Penn Hills",
    county: "Allegheny County",
    miles: 11,
    note: "One of Allegheny County's largest municipalities, an established eastern community with a wide range of home styles.",
    nearby: ["Monroeville", "Verona", "Plum"],
  },
  {
    slug: "plum",
    name: "Plum",
    county: "Allegheny County",
    miles: 17,
    note: "A spread-out eastern-suburb borough with newer developments and a suburban, family-friendly feel.",
    nearby: ["Monroeville", "Murrysville", "New Kensington"],
  },
  {
    slug: "murrysville",
    name: "Murrysville",
    county: "Westmoreland County",
    miles: 20,
    note: "A green, low-density Westmoreland County community along Route 22, popular with commuters wanting more space.",
    nearby: ["Export", "Delmont", "Monroeville"],
  },
  {
    slug: "greensburg",
    name: "Greensburg",
    county: "Westmoreland County",
    miles: 33,
    note: "The Westmoreland County seat, a cultural hub with a historic downtown, Seton Hill University, and easy Route 30 access.",
    nearby: ["Hempfield", "Jeannette", "Latrobe"],
  },
  {
    slug: "irwin",
    name: "Irwin",
    county: "Westmoreland County",
    miles: 22,
    note: "A welcoming Route 30 community near the Pennsylvania Turnpike, blending historic charm with suburban growth.",
    nearby: ["North Huntingdon", "Jeannette", "Norwin"],
  },
  {
    slug: "new-kensington",
    name: "New Kensington",
    county: "Westmoreland County",
    miles: 18,
    note: "An Allegheny River city with deep industrial roots and a revitalizing downtown, just northeast of Pittsburgh.",
    nearby: ["Arnold", "Lower Burrell", "Plum"],
  },
  {
    slug: "butler",
    name: "Butler",
    county: "Butler County",
    miles: 33,
    note: "The Butler County seat along Route 8, a historic manufacturing city serving a wide rural and suburban area.",
    nearby: ["Cranberry Township", "Saxonburg", "Lyndora"],
  },
  {
    slug: "beaver",
    name: "Beaver",
    county: "Beaver County",
    miles: 30,
    note: "The picturesque Beaver County seat on the Ohio River, known for its historic homes and tree-lined streets.",
    nearby: ["Rochester", "Bridgewater", "Aliquippa"],
  },
  {
    slug: "aliquippa",
    name: "Aliquippa",
    county: "Beaver County",
    miles: 26,
    note: "An Ohio River community with a proud steel-town heritage, part of the growing Beaver County corridor.",
    nearby: ["Hopewell Township", "Center Township", "Ambridge"],
  },
  {
    slug: "washington-pa-north",
    name: "Bridgeville",
    county: "Allegheny County",
    miles: 12,
    note: "A convenient South Hills borough at the I-79 and Route 50 junction, popular for its central location and revamped shopping.",
    nearby: ["South Fayette", "Heidelberg", "Collier Township"],
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
