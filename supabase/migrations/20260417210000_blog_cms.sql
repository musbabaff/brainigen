-- Update posts table
ALTER TABLE public.posts 
  ADD COLUMN IF NOT EXISTS reading_time INTEGER,
  ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS seo_title JSONB,
  ADD COLUMN IF NOT EXISTS seo_description JSONB,
  ADD COLUMN IF NOT EXISTS og_image TEXT;

-- Categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name JSONB NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description JSONB,
  color TEXT DEFAULT '#5B4FE9',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Post categories junction
CREATE TABLE IF NOT EXISTS public.post_categories (
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- Post views tracking
CREATE TABLE IF NOT EXISTS public.post_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  visitor_id TEXT,
  ip_address TEXT,
  country TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
