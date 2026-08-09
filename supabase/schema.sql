-- Smilish Group — Database Schema
-- Run this once in Supabase: Project → SQL Editor → New query → paste → Run.
-- Safe to re-run: every statement uses IF NOT EXISTS / OR REPLACE.

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------
create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------------
-- Admin users
-- Anyone who should be able to log in to /admin needs a row here, keyed to
-- their Supabase Auth user id. Creating an Auth user does NOT grant admin
-- access by itself — that's what this table (and RLS policies) are for.
-- ---------------------------------------------------------------------------
create table if not exists admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'admin' check (role in ('admin', 'staff')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Fashion — Products
-- ---------------------------------------------------------------------------
create table if not exists fashion_products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  price numeric(12,2) not null default 0,
  discount numeric(12,2),
  category text,
  fabric text,
  sizes text[] not null default '{}',
  colors text[] not null default '{}',
  stock_quantity integer not null default 0,
  sku text,
  main_image text,
  gallery_images text[] not null default '{}',
  featured boolean not null default false,
  status text not null default 'Draft' check (status in ('Draft', 'Published', 'Out of Stock', 'Archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Fashion — Projects (portfolio / past work)
-- ---------------------------------------------------------------------------
create table if not exists fashion_projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  description text,
  category text,
  client_name text,
  images text[] not null default '{}',
  project_date date,
  featured boolean not null default false,
  status text not null default 'Draft' check (status in ('Draft', 'Published', 'Archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- AI Automation — Services
-- ---------------------------------------------------------------------------
create table if not exists automation_services (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  summary text,
  description text,
  features text[] not null default '{}',
  industries text[] not null default '{}',
  pricing_type text check (pricing_type in ('Custom Quote', 'Monthly Retainer', 'One-Time Build')),
  images text[] not null default '{}',
  case_study text,
  featured boolean not null default false,
  status text not null default 'Draft' check (status in ('Draft', 'Published', 'Archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- AI Automation — Projects (case studies)
-- ---------------------------------------------------------------------------
create table if not exists automation_projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  client_business text,
  problem text,
  solution text,
  workflow_tools text[] not null default '{}',
  results text[] not null default '{}',
  screenshots text[] not null default '{}',
  video_url text,
  project_date date,
  featured boolean not null default false,
  status text not null default 'Draft' check (status in ('Draft', 'Published', 'Archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Real Estate — Properties
-- ---------------------------------------------------------------------------
create table if not exists properties (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  description text,
  price numeric(14,2) not null default 0,
  price_unit text not null default 'total' check (price_unit in ('total', 'per year', 'per month')),
  location text,
  state text,
  city text,
  area_sqm numeric(10,2),
  property_type text check (property_type in ('Land', 'House', 'Apartment', 'Office', 'Shop', 'Commercial', 'Estate')),
  transaction_type text check (transaction_type in ('For Sale', 'For Rent', 'Lease', 'Investment')),
  bedrooms integer,
  bathrooms integer,
  land_size_sqm numeric(10,2),
  features text[] not null default '{}',
  property_images text[] not null default '{}',
  floor_plan text,
  video_url text,
  latitude numeric(10,6),
  longitude numeric(10,6),
  documentation_status text,
  agent_name text,
  agent_phone text,
  status text not null default 'Available' check (status in ('Available', 'Reserved', 'Sold', 'Rented', 'Unavailable')),
  featured boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Real Estate — Property Inspections
-- ---------------------------------------------------------------------------
create table if not exists property_inspections (
  id uuid primary key default uuid_generate_v4(),
  customer_name text not null,
  phone text,
  email text,
  property_id uuid references properties(id) on delete set null,
  inspection_date date,
  inspection_time time,
  status text not null default 'Pending' check (status in ('Pending', 'Confirmed', 'Completed', 'Cancelled', 'Rescheduled')),
  message text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Leads (from Contact / Custom Design / Automation Audit forms)
-- ---------------------------------------------------------------------------
create table if not exists leads (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text,
  email text,
  branch text check (branch in ('Fashion', 'AI Automation', 'Real Estate', 'General Inquiry')),
  service text,
  source text,
  status text not null default 'New' check (status in ('New', 'Contacted', 'Qualified', 'Proposal', 'Converted', 'Lost', 'Archived')),
  details jsonb not null default '{}',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Contact Messages
-- ---------------------------------------------------------------------------
create table if not exists contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text,
  phone text,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Media Library
-- ---------------------------------------------------------------------------
create table if not exists media (
  id uuid primary key default uuid_generate_v4(),
  file_path text not null,
  file_name text not null,
  alt_text text,
  description text,
  uploaded_by uuid references admin_users(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Site Content (homepage hero, about text, footer, SEO metadata, etc.)
-- Simple key/value store so the admin can edit copy without a migration.
-- ---------------------------------------------------------------------------
create table if not exists site_content (
  key text primary key,
  value jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- updated_at auto-touch trigger
-- ---------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare
  t text;
begin
  foreach t in array array['fashion_products','fashion_projects','automation_services','automation_projects','properties']
  loop
    execute format(
      'drop trigger if exists trg_set_updated_at on %I; create trigger trg_set_updated_at before update on %I for each row execute function set_updated_at();',
      t, t
    );
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- Public (anonymous) visitors can only READ published/available content.
-- All writes — and all reads of leads/messages/inspections/media/admin_users —
-- require an authenticated admin (checked via the admin_users table).
-- ---------------------------------------------------------------------------
alter table admin_users enable row level security;
alter table fashion_products enable row level security;
alter table fashion_projects enable row level security;
alter table automation_services enable row level security;
alter table automation_projects enable row level security;
alter table properties enable row level security;
alter table property_inspections enable row level security;
alter table leads enable row level security;
alter table contact_messages enable row level security;
alter table media enable row level security;
alter table site_content enable row level security;

create or replace function is_admin()
returns boolean language sql stable as $$
  select exists (select 1 from admin_users where id = auth.uid());
$$;

-- Public read access to published content only
drop policy if exists "public read published products" on fashion_products;
create policy "public read published products" on fashion_products
  for select using (status = 'Published');

drop policy if exists "public read published fashion projects" on fashion_projects;
create policy "public read published fashion projects" on fashion_projects
  for select using (status = 'Published');

drop policy if exists "public read published services" on automation_services;
create policy "public read published services" on automation_services
  for select using (status = 'Published');

drop policy if exists "public read published automation projects" on automation_projects;
create policy "public read published automation projects" on automation_projects
  for select using (status = 'Published');

drop policy if exists "public read published properties" on properties;
create policy "public read published properties" on properties
  for select using (published = true);

drop policy if exists "public read site content" on site_content;
create policy "public read site content" on site_content
  for select using (true);

-- Public INSERT-only access for lead capture / forms (no read/update/delete)
drop policy if exists "public submit leads" on leads;
create policy "public submit leads" on leads for insert with check (true);

drop policy if exists "public submit messages" on contact_messages;
create policy "public submit messages" on contact_messages for insert with check (true);

drop policy if exists "public submit inspections" on property_inspections;
create policy "public submit inspections" on property_inspections for insert with check (true);

-- Admin full access to everything
drop policy if exists "admin full access" on admin_users;
create policy "admin full access" on admin_users for all using (is_admin()) with check (is_admin());

do $$
declare
  t text;
begin
  foreach t in array array[
    'fashion_products','fashion_projects','automation_services','automation_projects',
    'properties','property_inspections','leads','contact_messages','media','site_content'
  ]
  loop
    execute format('drop policy if exists "admin full access" on %I;', t);
    execute format('create policy "admin full access" on %I for all using (is_admin()) with check (is_admin());', t);
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Storage bucket for uploaded images (products, properties, projects, etc.)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public read media bucket" on storage.objects;
create policy "public read media bucket" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "admin manage media bucket" on storage.objects;
create policy "admin manage media bucket" on storage.objects
  for all using (bucket_id = 'media' and is_admin())
  with check (bucket_id = 'media' and is_admin());

-- ---------------------------------------------------------------------------
-- Seed: default site content keys the homepage/about page reads
-- ---------------------------------------------------------------------------
insert into site_content (key, value) values
  ('homepage_hero', '{"eyebrow": "Smilish Group — Fashion · AI Automation · Real Estate", "title": "Building Businesses. Creating Value.", "subtitle": "One group, three businesses — Fashion, AI Automation and Real Estate — built on quality, trust and long-term thinking."}'),
  ('about_story', '{"title": "One founder''s belief that businesses should outlive the founder.", "body": "Smilish Group began as a single idea..."}'),
  ('contact_info', '{"phone": "+234 000 000 0000", "email": "hello@smilishgroup.com", "instagram": "smilishgroup", "location": "Lagos, Nigeria"}')
on conflict (key) do nothing;
