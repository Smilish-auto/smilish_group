// One-off script: generates supabase/seed.sql from the demo content that
// used to live in lib/data/*.ts, so a freshly connected Supabase project
// isn't empty. Run with: node scripts/generate-seed.mjs > supabase/seed.sql

function sqlStr(v) {
  if (v === undefined || v === null || v === "") return "null";
  return `'${String(v).replace(/'/g, "''")}'`;
}
function sqlArr(arr) {
  if (!arr || arr.length === 0) return "'{}'";
  return `ARRAY[${arr.map((v) => sqlStr(v)).join(", ")}]`;
}
function sqlNum(v) {
  return v === undefined || v === null ? "null" : v;
}
function sqlBool(v) {
  return v ? "true" : "false";
}

const fashionProducts = [
  { slug: "royal-navy-agbada", name: "Royal Navy Agbada", category: "Agbada", fabric: "Hand-embroidered Cashmere", price: 185000, colors: ["Navy", "Gold Trim"], sizes: ["M", "L", "XL", "XXL", "Custom"], stock: 6, sku: "SF-AGB-001", featured: true, status: "Published", description: "A ceremonial agbada in deep navy cashmere with hand-worked gold embroidery along the collar and cuffs. Tailored fully custom to your measurements for weddings, chieftaincy and formal occasions." },
  { slug: "obsidian-senator-set", name: "Obsidian Senator Set", category: "Senator Wear", fabric: "Italian Wool Blend", price: 95000, colors: ["Black", "Charcoal"], sizes: ["S", "M", "L", "XL", "Custom"], stock: 12, sku: "SF-SEN-014", featured: true, status: "Published", description: "A sharply tailored two-piece senator set built for boardrooms and formal events, finished with a structured collar and mother-of-pearl buttons." },
  { slug: "gilded-native-shirt", name: "Gilded Native Shirt", category: "Native Shirts", fabric: "Premium Cotton Guinea Brocade", price: 42000, colors: ["White/Gold", "Navy/Gold"], sizes: ["S", "M", "L", "XL"], stock: 20, sku: "SF-NAT-032", featured: true, status: "Published", description: "Breathable guinea brocade native shirt with gold thread detailing at the neckline — a versatile piece for Friday wear and casual celebrations." },
  { slug: "heritage-kaftan", name: "Heritage Kaftan", category: "Kaftans", fabric: "Silk-Cotton Blend", price: 68000, colors: ["Ivory", "Deep Navy"], sizes: ["M", "L", "XL", "Custom"], stock: 9, sku: "SF-KAF-009", featured: false, status: "Published", description: "A relaxed-fit kaftan cut from a silk-cotton blend that drapes cleanly — comfortable enough for daily wear, sharp enough for guests." },
  { slug: "monogram-street-hoodie", name: "Monogram Street Hoodie", category: "Streetwear", fabric: "Heavyweight French Terry", price: 28000, colors: ["Black", "Navy"], sizes: ["S", "M", "L", "XL", "XXL"], stock: 34, sku: "SF-STR-101", featured: true, status: "Published", description: "Heavyweight hoodie with an embroidered SG monogram at the chest and a boxy, oversized fit true to Smilish streetwear proportions." },
  { slug: "atelier-joggers", name: "Atelier Joggers", category: "Streetwear", fabric: "Brushed Cotton Fleece", price: 22000, colors: ["Black", "Stone Grey"], sizes: ["S", "M", "L", "XL"], stock: 0, sku: "SF-STR-108", featured: false, status: "Out of Stock", description: "Tapered joggers with a ribbed cuff and side-seam pocket, designed as the everyday counterpart to the Monogram collection." },
  { slug: "corporate-oxford-shirt", name: "Corporate Oxford Shirt", category: "Corporate Wear", fabric: "Egyptian Cotton", price: 32000, colors: ["White", "Sky Blue", "Navy"], sizes: ["S", "M", "L", "XL", "XXL"], stock: 18, sku: "SF-COR-021", featured: false, status: "Published", description: "A precision-cut Oxford shirt for corporate wardrobes and staff uniforms, available for bulk order with company branding on request." },
  { slug: "midnight-wedding-kaftan", name: "Midnight Wedding Kaftan", category: "Wedding and Event Wear", fabric: "Embellished Silk", price: 145000, colors: ["Midnight Navy", "Gold Embroidery"], sizes: ["M", "L", "XL", "Custom"], stock: 4, sku: "SF-WED-005", featured: true, status: "Published", description: "A statement kaftan for grooms and guests, hand-embellished with gold thread along the neckline and cuffs — built for the reception, not just the ceremony." },
  { slug: "signature-cap", name: "Signature Cap", category: "Streetwear", fabric: "Cotton Twill", price: 12000, colors: ["Black", "Navy", "Stone"], sizes: ["One Size"], stock: 41, sku: "SF-STR-115", featured: false, status: "Published", description: "A structured six-panel cap with a subtly embroidered SG monogram — the easiest way into the Smilish streetwear line." },
  { slug: "consultation-fitting", name: "Personal Styling & Fitting Session", category: "Fashion Consultation", fabric: "N/A", price: 15000, colors: [], sizes: [], stock: 999, sku: "SF-CON-001", featured: false, status: "Published", description: "A one-on-one session with a Smilish stylist to plan an outfit, take measurements, or refine a wardrobe for an upcoming event — fee is credited toward any order placed the same day." },
];

const fashionProjects = [
  { slug: "adeyemi-wedding-agbada", title: "Adeyemi Wedding Agbada Collection", category: "Wedding and Event Wear", clientName: "Private Client", date: "2025-11-02", featured: true, description: "A five-piece agbada commission for a groom and his train, unifying navy and gold across five custom fits for the traditional ceremony." },
  { slug: "lagos-fintech-uniforms", title: "Lagos Fintech Staff Uniforms", category: "Corporate Wear", clientName: "Confidential Fintech Client", date: "2025-09-14", featured: true, description: "60 units of branded corporate shirts and blazers produced and fitted for a fintech company's Lagos head office launch." },
  { slug: "streetwear-capsule-vol2", title: "Streetwear Capsule Vol. 2", category: "Streetwear", clientName: null, date: "2025-06-30", featured: false, description: "An in-house capsule drop of 200 units across hoodies, joggers and caps, styled and shot for the Smilish Instagram launch." },
];

const automationServices = [
  { slug: "ai-customer-service-agent", name: "AI Customer Service Agent", summary: "A 24/7 AI agent that answers customer questions, takes orders and escalates when needed.", description: "Deployed across WhatsApp, Instagram and your website, the AI Customer Service Agent understands your product catalogue, answers repetitive questions instantly, and hands off to a human teammate the moment a conversation needs one.", features: ["24/7 multi-channel coverage", "Trained on your own knowledge base", "Order capture and status updates", "Human hand-off with full conversation context"], industries: ["Food & Restaurants", "Retail", "Services"], pricingType: "Monthly Retainer", featured: true },
  { slug: "ai-sales-assistant", name: "AI Sales Assistant", summary: "Qualifies inbound leads, answers objections and books calls automatically.", description: "The AI Sales Assistant engages every inbound lead within seconds, asks the qualifying questions your sales team would ask, and books a call directly onto your calendar for the leads worth a conversation.", features: ["Automatic lead qualification", "Objection handling scripts", "Calendar booking integration", "CRM sync on every conversation"], industries: ["B2B Services", "Real Estate", "Automation Clients"], pricingType: "Custom Quote", featured: true },
  { slug: "ai-booking-agent", name: "AI Booking Agent", summary: "Handles appointment and inspection bookings without back-and-forth messages.", description: "Whether it's a property inspection, a fitting appointment or a consultation call, the AI Booking Agent finds an open slot, confirms it with the customer and syncs it to your calendar automatically.", features: ["Real-time calendar availability", "Automatic reminders and reschedules", "Two-way WhatsApp and email confirmation", "No-show follow-up sequences"], industries: ["Real Estate", "Fashion Consultations", "Clinics & Services"], pricingType: "Monthly Retainer", featured: true },
  { slug: "ai-knowledge-assistant", name: "AI Knowledge Assistant", summary: "An internal assistant trained on your company's documents, SOPs and FAQs.", description: "Give your team an assistant that already knows your SOPs, pricing sheets and policies — cutting down the time spent digging through documents or waiting on a manager to reply.", features: ["Trained on internal documents", "Slack, WhatsApp or web access", "Always up to date as documents change", "Usage and gap analytics"], industries: ["Any growing team"], pricingType: "One-Time Build", featured: false },
];

const automationProjects = [
  { slug: "item7go-order-automation", title: "24/7 Order & Support Automation for a Food Ordering Brand", clientBusiness: "Food Ordering Company", problem: "Orders and customer questions were handled manually across phone and DM, causing missed orders and slow replies during peak hours.", solution: "Built an AI customer service and ordering agent that handles menu questions, takes full orders, and routes delivery issues to a human when needed.", workflowTools: ["n8n", "LLM API", "WhatsApp Business API", "Google Sheets"], results: ["Faster response times during peak hours", "Orders now captured automatically around the clock", "Fewer repetitive questions reaching the support line"], date: "2025-10-01", featured: true },
  { slug: "b2b-lead-qualification-workflow", title: "Automated Lead Qualification & Outreach Pipeline", clientBusiness: "B2B Services Company", problem: "The sales team was spending hours manually researching and qualifying leads before any outreach began.", solution: "Built an automated research and qualification workflow that scores inbound and outbound leads and routes qualified ones straight into the CRM.", workflowTools: ["n8n", "CRM Integration", "Email Automation"], results: ["Reduced manual research time", "Consistent lead scoring", "Cleaner CRM pipeline"], date: "2025-07-20", featured: true },
];

const properties = [
  { slug: "lekki-phase-1-4bed-duplex", title: "4-Bedroom Detached Duplex, Lekki Phase 1", description: "A fully finished 4-bedroom detached duplex with a boys' quarters, ensuite bedrooms and a private compound in a serene, gated close within Lekki Phase 1.", price: 185000000, priceUnit: "total", location: "Lekki Phase 1", state: "Lagos", city: "Lekki", areaSqm: 450, propertyType: "House", transactionType: "For Sale", bedrooms: 4, bathrooms: 5, landSizeSqm: 650, features: ["Boys' Quarters", "Fitted Kitchen", "24/7 Estate Security", "Parking for 4 Cars"], documentation: "Certificate of Occupancy (C of O)", agentName: "Chidera Okonkwo", agentPhone: "+234 000 000 0001", status: "Available", featured: true },
  { slug: "ikeja-gra-office-suite", title: "Furnished Office Suite, Ikeja GRA", description: "A ready-to-move-in 220sqm office suite on the second floor of a modern commercial building, with dedicated parking and backup power.", price: 4500000, priceUnit: "per year", location: "Ikeja GRA", state: "Lagos", city: "Ikeja", areaSqm: 220, propertyType: "Office", transactionType: "For Rent", bedrooms: null, bathrooms: null, landSizeSqm: null, features: ["24/7 Power Backup", "Elevator Access", "Dedicated Parking", "Fibre Internet Ready"], documentation: "Deed of Sublease Available", agentName: "Tunde Bakare", agentPhone: "+234 000 000 0002", status: "Available", featured: true },
  { slug: "epe-waterfront-land", title: "1,000 sqm Waterfront Land, Epe", description: "Dry, fenced waterfront land in a fast-appreciating corridor of Epe, suitable for a private residence or short-let development.", price: 28000000, priceUnit: "total", location: "Agemowo, Epe", state: "Lagos", city: "Epe", areaSqm: 1000, propertyType: "Land", transactionType: "For Sale", bedrooms: null, bathrooms: null, landSizeSqm: 1000, features: ["Waterfront", "Fenced & Gated", "Dry Land", "Good Road Access"], documentation: "Registered Survey & Deed of Assignment", agentName: "Chidera Okonkwo", agentPhone: "+234 000 000 0001", status: "Available", featured: true },
  { slug: "victoria-island-2bed-apartment", title: "2-Bedroom Serviced Apartment, Victoria Island", description: "A serviced 2-bedroom apartment with a full-time concierge, gym and pool access, ideal for young professionals and short-let investors.", price: 6500000, priceUnit: "per year", location: "Victoria Island", state: "Lagos", city: "Victoria Island", areaSqm: 120, propertyType: "Apartment", transactionType: "For Rent", bedrooms: 2, bathrooms: 3, landSizeSqm: null, features: ["Concierge", "Gym & Pool Access", "Serviced", "Standby Generator"], documentation: "Tenancy Agreement", agentName: "Tunde Bakare", agentPhone: "+234 000 000 0002", status: "Reserved", featured: false },
  { slug: "abuja-guzape-shop", title: "Retail Shop Space, Guzape District", description: "A 60sqm ground-floor retail shop on a busy commercial strip in Guzape, previously operated as a boutique showroom.", price: 2200000, priceUnit: "per year", location: "Guzape District", state: "FCT — Abuja", city: "Abuja", areaSqm: 60, propertyType: "Shop", transactionType: "For Rent", bedrooms: null, bathrooms: null, landSizeSqm: null, features: ["High Foot Traffic", "Street-Facing Frontage", "Shared Parking"], documentation: "Tenancy Agreement", agentName: "Amara Nwosu", agentPhone: "+234 000 000 0003", status: "Available", featured: false },
  { slug: "ibeju-lekki-estate-plots", title: "Serviced Plots, Smilish Gardens Estate", description: "500sqm serviced plots inside a developing gated estate along the Lekki-Epe corridor, with allocation available on select rows.", price: 15000000, priceUnit: "total", location: "Smilish Gardens Estate", state: "Lagos", city: "Ibeju-Lekki", areaSqm: 500, propertyType: "Estate", transactionType: "Investment", bedrooms: null, bathrooms: null, landSizeSqm: 500, features: ["Gated Estate", "Perimeter Fencing", "Estate Road Network", "Flexible Payment Plan"], documentation: "Registered Survey — C of O in View", agentName: "Amara Nwosu", agentPhone: "+234 000 000 0003", status: "Available", featured: true },
  { slug: "ajah-3bed-terrace", title: "3-Bedroom Terrace Duplex, Ajah", description: "A newly built 3-bedroom terrace duplex inside a serviced estate off the Lekki-Epe expressway, walking distance from the estate mall and school.", price: 78000000, priceUnit: "total", location: "Off Lekki-Epe Expressway", state: "Lagos", city: "Ajah", areaSqm: 220, propertyType: "House", transactionType: "For Sale", bedrooms: 3, bathrooms: 4, landSizeSqm: 300, features: ["Estate Mall Nearby", "Ensuite Bedrooms", "Fitted Kitchen", "24/7 Estate Security"], documentation: "Deed of Assignment — Governor's Consent in Progress", agentName: "Chidera Okonkwo", agentPhone: "+234 000 000 0001", status: "Available", featured: false },
  { slug: "wuse-2-commercial-complex", title: "Commercial Complex Floor, Wuse 2", description: "A full 300sqm floor in a busy commercial complex, previously fitted as a bank branch — suitable for a showroom, clinic or corporate office.", price: 12000000, priceUnit: "per year", location: "Wuse 2", state: "FCT — Abuja", city: "Abuja", areaSqm: 300, propertyType: "Commercial", transactionType: "For Rent", bedrooms: null, bathrooms: null, landSizeSqm: null, features: ["Previously Fitted", "Standby Generator", "Ample Parking", "High Visibility Frontage"], documentation: "Tenancy Agreement", agentName: "Amara Nwosu", agentPhone: "+234 000 000 0003", status: "Available", featured: false },
  { slug: "banana-island-luxury-penthouse", title: "Luxury Penthouse, Banana Island", description: "A five-bedroom penthouse with private pool and skyline views, fully finished with imported fittings throughout — one of a limited number in the building.", price: 950000000, priceUnit: "total", location: "Banana Island", state: "Lagos", city: "Ikoyi", areaSqm: 680, propertyType: "Apartment", transactionType: "For Sale", bedrooms: 5, bathrooms: 6, landSizeSqm: null, features: ["Private Pool", "Skyline Views", "Imported Fittings", "Private Elevator Access"], documentation: "Certificate of Occupancy (C of O)", agentName: "Tunde Bakare", agentPhone: "+234 000 000 0002", status: "Reserved", featured: true },
];

let sql = `-- Smilish Group — Demo Content Seed
-- Auto-generated from the site's original placeholder content. Run this
-- AFTER supabase/schema.sql, once, in Supabase's SQL Editor, so your live
-- site isn't empty before you've added real products/properties yourself.
-- Safe to skip entirely if you'd rather start empty and add everything
-- through /admin instead.

`;

sql += `-- Fashion Products\n`;
for (const p of fashionProducts) {
  sql += `insert into fashion_products (name, slug, description, price, category, fabric, sizes, colors, stock_quantity, sku, featured, status) values (${sqlStr(p.name)}, ${sqlStr(p.slug)}, ${sqlStr(p.description)}, ${sqlNum(p.price)}, ${sqlStr(p.category)}, ${sqlStr(p.fabric)}, ${sqlArr(p.sizes)}, ${sqlArr(p.colors)}, ${sqlNum(p.stock)}, ${sqlStr(p.sku)}, ${sqlBool(p.featured)}, ${sqlStr(p.status)}) on conflict (slug) do nothing;\n`;
}

sql += `\n-- Fashion Projects\n`;
for (const p of fashionProjects) {
  sql += `insert into fashion_projects (title, slug, description, category, client_name, project_date, featured, status) values (${sqlStr(p.title)}, ${sqlStr(p.slug)}, ${sqlStr(p.description)}, ${sqlStr(p.category)}, ${sqlStr(p.clientName)}, ${sqlStr(p.date)}, ${sqlBool(p.featured)}, 'Published') on conflict (slug) do nothing;\n`;
}

sql += `\n-- Automation Services\n`;
for (const s of automationServices) {
  sql += `insert into automation_services (name, slug, summary, description, features, industries, pricing_type, featured, status) values (${sqlStr(s.name)}, ${sqlStr(s.slug)}, ${sqlStr(s.summary)}, ${sqlStr(s.description)}, ${sqlArr(s.features)}, ${sqlArr(s.industries)}, ${sqlStr(s.pricingType)}, ${sqlBool(s.featured)}, 'Published') on conflict (slug) do nothing;\n`;
}

sql += `\n-- Automation Projects (Case Studies)\n`;
for (const p of automationProjects) {
  sql += `insert into automation_projects (title, slug, client_business, problem, solution, workflow_tools, results, project_date, featured, status) values (${sqlStr(p.title)}, ${sqlStr(p.slug)}, ${sqlStr(p.clientBusiness)}, ${sqlStr(p.problem)}, ${sqlStr(p.solution)}, ${sqlArr(p.workflowTools)}, ${sqlArr(p.results)}, ${sqlStr(p.date)}, ${sqlBool(p.featured)}, 'Published') on conflict (slug) do nothing;\n`;
}

sql += `\n-- Properties\n`;
for (const p of properties) {
  sql += `insert into properties (title, slug, description, price, price_unit, location, state, city, area_sqm, property_type, transaction_type, bedrooms, bathrooms, land_size_sqm, features, documentation_status, agent_name, agent_phone, status, featured, published) values (${sqlStr(p.title)}, ${sqlStr(p.slug)}, ${sqlStr(p.description)}, ${sqlNum(p.price)}, ${sqlStr(p.priceUnit)}, ${sqlStr(p.location)}, ${sqlStr(p.state)}, ${sqlStr(p.city)}, ${sqlNum(p.areaSqm)}, ${sqlStr(p.propertyType)}, ${sqlStr(p.transactionType)}, ${sqlNum(p.bedrooms)}, ${sqlNum(p.bathrooms)}, ${sqlNum(p.landSizeSqm)}, ${sqlArr(p.features)}, ${sqlStr(p.documentation)}, ${sqlStr(p.agentName)}, ${sqlStr(p.agentPhone)}, ${sqlStr(p.status)}, ${sqlBool(p.featured)}, true) on conflict (slug) do nothing;\n`;
}

console.log(sql);
