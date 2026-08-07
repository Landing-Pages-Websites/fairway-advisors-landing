// Site-wide content + config for Fairway Advisors — sell-side golf brokerage LP.
// Single source of truth for copy, phone, form options, and tracking IDs.
// Messaging guardrails (verbatim, do NOT alter):
//   • Always "over $1 billion sold AND advised" — never "sold" alone.
//   • Firm is over 20 years old (founded 2005).
//   • Principal has over 30 years exclusively in golf.
//   • "three golf courses sold that hosted a major championship".
//   • "unrivaled track record from California to New York".
//   • Trademarks: "The Business of Golf®" and "There's a Major Difference®".

export const PHONE = "(214) 485-1500";
export const PHONE_HREF = "tel:2144851500";

export const CTA = {
  primary: "Find out what your course is worth",
  secondary: "Call (214) 485-1500",
  formAnchor: "#lead-form",
};

export const BRAND = {
  company: "Fairway Advisors",
  tagline: "The Business of Golf®",
  difference: "There's a Major Difference®",
  yearsInBusiness: "20+",
  foundedYear: 2005,
  email: "jeff.davis@fairwayadvisors.com",
  emailHref: "mailto:jeff.davis@fairwayadvisors.com",
  principal: "Jeff Davis",
};

export const CURRENT_YEAR = new Date().getFullYear();

// ─── Hero (sell-side, free-evaluation offer) ───
export const HERO = {
  eyebrow: "Golf Course Brokerage & Advisory",
  chips: [
    "Over $1 billion sold & advised",
    "20+ years",
    "Confidential & invitation-only",
  ],
  h1Lead: "The Business of Golf",
  h1Trademark: "®",
  h1Punct: ".",
  subhead:
    "Find out what your course is worth — a free, confidential evaluation for courses with 18+ holes and $1M+ in gross revenue.",
  supporting:
    "Fairway Advisors is a golf course brokerage and advisory firm with over $1 billion sold and advised — an unrivaled track record from California to New York.",
};

// ─── Trust bar (verbatim proof stats — messaging guardrails) ───
export const PROOF_STATS = [
  { value: "$1B+", label: "sold & advised" },
  { value: "20+", label: "years in business" },
  { value: "30+", label: "years exclusively in golf" },
  { value: "3", label: "major-championship venues sold" },
];

// ─── Why Fairway (PAS — problem / agitate / solution) ───
export const WHY = {
  eyebrow: "There's a Major Difference®",
  headline: "A generalist broker doesn't understand the business of golf.",
  problem:
    "Most owners hand their course to a local or generalist commercial broker who has never structured a golf transaction. Golf is not office space or retail — it is a specialized asset with member dynamics, licensing, seasonality, and buyer pools a generalist has never navigated.",
  agitate:
    "Your property's value — and its confidentiality — is only as strong as the broker representing it. The wrong process signals distress to the market, erodes price, and puts your reputation and your members' trust at risk.",
  solution:
    "Fairway Advisors does nothing but the business of golf. Through a discreet, invitation-only process we position your course to the right buyers, protect your confidentiality, and command the highest price in the shortest time. That's the major difference.",
  differentiators: [
    {
      icon: "target",
      title: "Specialists, not generalists",
      body: "We broker golf and only golf — every day, in every market, from private clubs to daily-fee and resort assets.",
    },
    {
      icon: "shield",
      title: "Confidential by design",
      body: "An invitation-only process that protects your operation, your members, and your reputation from start to close.",
    },
    {
      icon: "handshake",
      title: "The right buyers",
      body: "Three decades of relationships with the operators, funds, and private buyers who actually acquire golf assets.",
    },
  ],
};

// ─── Track record (named transactions, California to New York) ───
export const TRACK_RECORD = {
  eyebrow: "Track Record",
  headline: "An unrivaled track record — from California to New York.",
  subhead:
    "Three of the golf courses we've sold hosted a major championship — a selection of notable transactions across three decades.",
  // Championship pedigree — three major-championship venues, presented as
  // named, text-forward cards (no course-specific photography).
  championship: {
    title: "Championship pedigree",
    note: "Three of the courses we've sold hosted a PGA Championship.",
    venues: [
      {
        name: "Engineers Country Club",
        location: "Roslyn Harbor, New York",
        note: "Host of the 1919 PGA Championship",
      },
      {
        name: "Blue Hill Country Club",
        location: "Canton, Massachusetts",
        note: "Host of the 1956 PGA Championship",
      },
      {
        name: "Kemper Lakes Golf Club",
        location: "Long Grove, Illinois",
        note: "Host of the 1989 PGA Championship",
      },
    ],
  },
  // Photo strip — only courses we hold authentic photography of. Every card
  // is labeled with its OWN course name; no photo is captioned as another
  // course. Blue Hill is both a real photo and a major-championship venue.
  featured: [
    {
      name: "Edgewood Country Club",
      location: "New Jersey",
      note: null,
      image: "/images/hero-edgewood.jpg",
      major: false,
    },
    {
      name: "Oakwood Country Club",
      location: "Kansas City, Missouri",
      note: null,
      image: "/images/hero-oakwood.jpg",
      major: false,
    },
    {
      name: "Blue Hill Country Club",
      location: "Canton, Massachusetts",
      note: "Host of the 1956 PGA Championship",
      image: "/images/hero-bluehill.jpg",
      major: true,
    },
    {
      name: "Elmwood Country Club",
      location: "White Plains, New York",
      note: null,
      image: "/images/hero-elmwood.jpg",
      major: false,
    },
  ],
  others: [
    { name: "Valencia Country Club", location: "Valencia, California" },
    { name: "Shackamaxon Country Club", location: "Scotch Plains, New Jersey" },
  ],
};

// ─── Services (sell-side brokerage focus) ───
export const SERVICES = {
  eyebrow: "Sell-Side Services",
  headline: "A systematic disposition, executed white-glove.",
  subhead:
    "Every engagement is bespoke — built to achieve the highest price in the shortest time while protecting your confidentiality.",
  items: [
    {
      icon: "flag",
      title: "Full-Service Brokerage",
      body: "A systematic disposition engineered for the highest price in the shortest time. We tailor the method to your asset and goals — Private Treaty (Invitation Only), Private Treaty (Open Market), Request for Proposal, Sealed Bid, and Internet Auction.",
      methods: [
        "Private Treaty — Invitation Only",
        "Private Treaty — Open Market",
        "Request for Proposal (RFP)",
        "Sealed Bid & Internet Auctions",
      ],
    },
    {
      icon: "users",
      title: "Member-Owned Club Recapitalizations",
      body: "For member-owned clubs, we structure recapitalizations and ownership transitions that stabilize the balance sheet, satisfy the membership, and preserve the club's future — with the discretion these situations demand.",
    },
    {
      icon: "compass",
      title: "Alternative-Use & Redevelopment",
      body: "When the highest and best use is no longer golf, we bring deep entitlement and redevelopment expertise to unlock the land's full value for residential, mixed-use, and alternative-use buyers.",
    },
  ],
};

// ─── Buy-side (secondary — Buy-Side ad group) ───
export const BUY_SIDE = {
  eyebrow: "Acquisition Advisory",
  headline: "Looking to acquire?",
  body: "Fairway Advisors represents select buying entities seeking off-market golf assets. We match opportunities to your investment criteria and manage the transaction through negotiation, due diligence, and closing.",
  detail:
    "We work with institutional investors, private-equity groups, and qualified individual buyers pursuing acquisitions in the $1M–$50M+ range.",
  cta: "Contact us",
};

// ─── Clients / institutions (logo wall) ───
export const CLIENTS = {
  eyebrow: "Trusted By",
  headline: "Trusted by leading institutions and clubs.",
  logos: [
    { src: "/images/logo-bofa.jpg", alt: "Bank of America" },
    { src: "/images/logo-textron.png", alt: "Textron Financial" },
    { src: "/images/logo-greenfield.png", alt: "Greenfield Partners" },
  ],
  clubs: [
    "Engineers Country Club",
    "Kemper Lakes Golf Club",
    "Blue Hill Country Club",
    "Valencia Country Club",
    "Shackamaxon Country Club",
  ],
};

// ─── FAQ (real seller questions) ───
export const FAQ = [
  {
    q: "How are golf course sales structured?",
    a: "There is no single formula. Depending on your asset and goals we run a Private Treaty (invitation only or open market), a Request for Proposal, a Sealed Bid, or an Internet Auction. We recommend the disposition method engineered to achieve the highest price in the shortest time while protecting your confidentiality.",
  },
  {
    q: "Do I need a golf course broker?",
    a: "Golf is a specialized asset. A generalist commercial broker rarely understands the intricacies of valuing and marketing a course, the buyer pool that actually acquires golf, or the confidentiality a sale demands. Fairway Advisors does nothing but the business of golf — that specialization is the difference between a transaction and the right transaction.",
  },
  {
    q: "Is the sale process the same for member-owned clubs?",
    a: "No. Member-owned clubs require a different approach — often a recapitalization or ownership transition rather than a straight sale. We structure the process to stabilize the club, satisfy the membership, and preserve its future, with the discretion these situations require.",
  },
  {
    q: "How do you value a golf course?",
    a: "Value reflects far more than acreage — revenue quality, membership, real estate and entitlement potential, deferred capital, and comparable transactions all factor in. Our free, confidential evaluation gives qualifying owners a clear, defensible picture of what their course is truly worth in today's market.",
  },
];

// ─── Final CTA ───
export const FINAL_CTA = {
  headline: "There's a Major Difference®.",
  headlineAccent: "Find out what your course is worth.",
  body: "Request your free, confidential evaluation — or call to speak with us directly. For courses with 18+ holes and $1M+ in gross revenue.",
};

// ─── Lead-form select options (wired exactly to the LeadFormField contract) ───
export const COURSE_TYPE_OPTIONS = ["9-hole", "18-hole", "27-hole or more"];
export const GROSS_REVENUE_OPTIONS = ["Under $1M", "$1M–$2M", "$2M+"];

// The two answers that gate the qualified-lead optimization event.
export const DISQUALIFYING = {
  courseType: "9-hole",
  grossRevenue: "Under $1M",
};

// ─── Mega tracking — real Fairway Advisors IDs. NO Meta Pixel (Meta is OFF). ───
export const TRACKING = {
  siteKey: "d4xupx8w9e0lki33",
  siteId: "005ce0e3-8326-4670-933e-bfcf8a7ddd65",
  gtmId: "GTM-KRNF4P5",
};

// Mega submission API. customerId is DIFFERENT from siteId — setting customerId
// to siteId causes a 401 and NO lead is captured. Keep them distinct.
export const FORM = {
  customerId: "19c42217-23f0-4e91-8e58-82b66a83e5e7",
  siteId: "005ce0e3-8326-4670-933e-bfcf8a7ddd65",
  sourceProvider: "fairway-advisors-landing",
};
