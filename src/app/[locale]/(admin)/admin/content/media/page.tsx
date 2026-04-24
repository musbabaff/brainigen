import { createClient } from '@/lib/supabase/server';
import { MediaLibraryClient } from '@/components/admin/content/media-library-client';
import { ImageIcon } from 'lucide-react';

const BUCKET = 'uploads';

export default async function MediaLibraryPage() {
  const supabase = await createClient();
  const { data } = await supabase.storage.from(BUCKET).list('', { limit: 500, sortBy: { column: 'created_at', order: 'desc' } });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center"><ImageIcon className="w-5 h-5 text-brand" /></div>
        <div><h1 className="text-h2">Media Library</h1><p className="text-muted text-sm">Manage uploaded files and images</p></div>
      </div>
      <MediaLibraryClient initialFiles={(data ?? []) as never} bucket={BUCKET} />
    </div>
  );
}
