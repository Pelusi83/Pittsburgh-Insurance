/**
 * Customer reviews — the single source of truth for testimonials AND the
 * star rating shown on the site and in structured data (schema.org).
 *
 * ⚠️ HONESTY / COMPLIANCE: Only put REAL reviews here. The star rating and
 * review count shown across the site (and the aggregateRating in JSON-LD that
 * Google reads) are computed from this list. Fake reviews or inflated counts
 * can trigger a Google penalty and hurt trust — so this starts EMPTY.
 *
 * HOW TO ADD REAL REVIEWS:
 *   1. Collect a real Google review (get the customer's OK to display it).
 *   2. Add an entry to the `reviews` array below.
 *   3. That's it — the rating, testimonials section, hero and header update
 *      automatically, and the aggregateRating schema turns on.
 */

export type Review = {
  name: string;
  area: string; // e.g. "Mount Lebanon"
  line: string; // e.g. "Home + Auto"
  rating: number; // 1–5
  quote: string;
  date?: string; // ISO date, optional (used in schema when present)
};

// Paste your real reviews here. Example shape (leave empty until you have real ones):
// {
//   name: "Denise R.",
//   area: "Mount Lebanon",
//   line: "Home + Auto",
//   rating: 5,
//   quote: "They found me better coverage and saved me money. Felt local and honest.",
//   date: "2026-02-14",
// },
export const reviews: Review[] = [];

export const hasReviews = reviews.length > 0;

export const reviewCount = reviews.length;

export const averageRating =
  reviews.length > 0
    ? Math.round(
        (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10
      ) / 10
    : 0;

/**
 * Your Google Business Profile "leave a review" short link.
 * Get it from your GBP dashboard (Ask for reviews → copy link), then paste it
 * here to activate "Leave us a review" buttons across the site.
 */
export const googleReviewUrl = "";
