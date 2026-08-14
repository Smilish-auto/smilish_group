import { createClient } from "./server";
import type {
  FashionProductRow,
  FashionProjectRow,
  AutomationServiceRow,
  AutomationProjectRow,
  PropertyRow,
} from "./types";

// Every function here is safe to call even before Supabase is configured or
// seeded — on ANY error (missing/bad env vars, empty table, RLS issue,
// network failure) it returns an empty array/null rather than throwing, so
// pages degrade to an empty state instead of crashing the whole request.
// Client creation happens INSIDE the try/catch here deliberately — Supabase
// throws synchronously if the URL/key env vars are missing, and that needs
// to be caught too, not just query errors.

async function safeQuery<T>(fn: () => Promise<{ data: T | null; error: unknown }>): Promise<T | null> {
  try {
    const { data, error } = await fn();
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Fashion — Products
// ---------------------------------------------------------------------------
export async function getFashionProducts(category?: string): Promise<FashionProductRow[]> {
  return (
    (await safeQuery(async () => {
      const supabase = await createClient();
      let query = supabase.from("fashion_products").select("*").order("created_at", { ascending: false });
      if (category) query = query.eq("category", category);
      return query;
    })) ?? []
  );
}

export async function getFeaturedFashionProducts(): Promise<FashionProductRow[]> {
  return (
    (await safeQuery(async () => {
      const supabase = await createClient();
      return supabase.from("fashion_products").select("*").eq("featured", true).order("created_at", { ascending: false }).limit(6);
    })) ?? []
  );
}

export async function getFashionProductBySlug(slug: string): Promise<FashionProductRow | null> {
  return await safeQuery(async () => {
    const supabase = await createClient();
    return supabase.from("fashion_products").select("*").eq("slug", slug).maybeSingle();
  });
}

// ---------------------------------------------------------------------------
// Fashion — Projects
// ---------------------------------------------------------------------------
export async function getFashionProjects(): Promise<FashionProjectRow[]> {
  return (
    (await safeQuery(async () => {
      const supabase = await createClient();
      return supabase.from("fashion_projects").select("*").order("project_date", { ascending: false });
    })) ?? []
  );
}

export async function getFeaturedFashionProjects(): Promise<FashionProjectRow[]> {
  return (
    (await safeQuery(async () => {
      const supabase = await createClient();
      return supabase.from("fashion_projects").select("*").eq("featured", true).order("project_date", { ascending: false }).limit(3);
    })) ?? []
  );
}

// ---------------------------------------------------------------------------
// AI Automation — Services
// ---------------------------------------------------------------------------
export async function getAutomationServices(): Promise<AutomationServiceRow[]> {
  return (
    (await safeQuery(async () => {
      const supabase = await createClient();
      return supabase.from("automation_services").select("*").order("created_at", { ascending: false });
    })) ?? []
  );
}

export async function getFeaturedAutomationServices(): Promise<AutomationServiceRow[]> {
  return (
    (await safeQuery(async () => {
      const supabase = await createClient();
      return supabase.from("automation_services").select("*").eq("featured", true).order("created_at", { ascending: false }).limit(6);
    })) ?? []
  );
}

export async function getAutomationServiceBySlug(slug: string): Promise<AutomationServiceRow | null> {
  return await safeQuery(async () => {
    const supabase = await createClient();
    return supabase.from("automation_services").select("*").eq("slug", slug).maybeSingle();
  });
}

// ---------------------------------------------------------------------------
// AI Automation — Projects (case studies)
// ---------------------------------------------------------------------------
export async function getAutomationProjects(): Promise<AutomationProjectRow[]> {
  return (
    (await safeQuery(async () => {
      const supabase = await createClient();
      return supabase.from("automation_projects").select("*").order("project_date", { ascending: false });
    })) ?? []
  );
}

export async function getFeaturedAutomationProjects(): Promise<AutomationProjectRow[]> {
  return (
    (await safeQuery(async () => {
      const supabase = await createClient();
      return supabase.from("automation_projects").select("*").eq("featured", true).order("project_date", { ascending: false }).limit(3);
    })) ?? []
  );
}

// ---------------------------------------------------------------------------
// Real Estate — Properties
// ---------------------------------------------------------------------------
export interface PropertyFilters {
  location?: string;
  type?: string;
  transaction?: string;
  state?: string;
  min?: number;
  max?: number;
  bedrooms?: number;
}

export async function getProperties(filters: PropertyFilters = {}): Promise<PropertyRow[]> {
  return (
    (await safeQuery(async () => {
      const supabase = await createClient();
      let query = supabase.from("properties").select("*").order("created_at", { ascending: false });
      if (filters.location) query = query.ilike("location", `%${filters.location}%`);
      if (filters.type) query = query.eq("property_type", filters.type);
      if (filters.transaction) query = query.eq("transaction_type", filters.transaction);
      if (filters.state) query = query.eq("state", filters.state);
      if (filters.min) query = query.gte("price", filters.min);
      if (filters.max) query = query.lte("price", filters.max);
      if (filters.bedrooms) query = query.gte("bedrooms", filters.bedrooms);
      return query;
    })) ?? []
  );
}

export async function getFeaturedProperties(): Promise<PropertyRow[]> {
  return (
    (await safeQuery(async () => {
      const supabase = await createClient();
      return supabase.from("properties").select("*").eq("featured", true).order("created_at", { ascending: false }).limit(6);
    })) ?? []
  );
}

export async function getPropertyBySlug(slug: string): Promise<PropertyRow | null> {
  return await safeQuery(async () => {
    const supabase = await createClient();
    return supabase.from("properties").select("*").eq("slug", slug).maybeSingle();
  });
}

export async function getPropertyFilterOptions(): Promise<{ types: string[]; states: string[] }> {
  const rows =
    (await safeQuery<{ property_type: string | null; state: string | null }[]>(async () => {
      const supabase = await createClient();
      return supabase.from("properties").select("property_type, state");
    })) ?? [];
  const types = Array.from(new Set(rows.map((r) => r.property_type).filter(Boolean))) as string[];
  const states = Array.from(new Set(rows.map((r) => r.state).filter(Boolean))) as string[];
  return { types, states };
}

// ---------------------------------------------------------------------------
// Unified Projects (combines Fashion, AI Automation, and Real Estate into
// one shape for the homepage "Our Work" section and the /projects gallery).
// Real Estate has no separate "projects" table — featured properties stand
// in as its entries, linking through to the property detail page.
// ---------------------------------------------------------------------------
export interface UnifiedProject {
  slug: string;
  branch: "Fashion" | "AI Automation" | "Real Estate";
  title: string;
  summary: string;
  client?: string;
  date: string;
  featured: boolean;
  href: string;
}

function toUnified(
  rows: (FashionProjectRow | AutomationProjectRow | PropertyRow)[],
  branch: UnifiedProject["branch"]
): UnifiedProject[] {
  return rows.map((r) => {
    if (branch === "Fashion") {
      const p = r as FashionProjectRow;
      return {
        slug: p.slug,
        branch,
        title: p.title,
        summary: p.description ?? "",
        client: p.client_name ?? undefined,
        date: p.project_date ?? p.created_at,
        featured: p.featured,
        href: `/project/${p.slug}`,
      };
    }
    if (branch === "AI Automation") {
      const p = r as AutomationProjectRow;
      return {
        slug: p.slug,
        branch,
        title: p.title,
        summary: p.solution ?? p.problem ?? "",
        client: p.client_business ?? undefined,
        date: p.project_date ?? p.created_at,
        featured: p.featured,
        href: `/project/${p.slug}`,
      };
    }
    const p = r as PropertyRow;
    return {
      slug: p.slug,
      branch,
      title: p.title,
      summary: p.description ?? "",
      date: p.created_at,
      featured: p.featured,
      href: `/real-estate/property/${p.slug}`,
    };
  });
}

export async function getUnifiedProjects(): Promise<UnifiedProject[]> {
  const [fashion, automation, properties] = await Promise.all([
    getFashionProjects(),
    getAutomationProjects(),
    getProperties(),
  ]);
  return [
    ...toUnified(fashion, "Fashion"),
    ...toUnified(automation, "AI Automation"),
    ...toUnified(properties, "Real Estate"),
  ].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getFeaturedUnifiedProjects(): Promise<UnifiedProject[]> {
  const all = await getUnifiedProjects();
  return all.filter((p) => p.featured).slice(0, 6);
}

export async function getUnifiedProjectBySlug(slug: string): Promise<UnifiedProject | null> {
  const all = await getUnifiedProjects();
  return all.find((p) => p.slug === slug) ?? null;
}
