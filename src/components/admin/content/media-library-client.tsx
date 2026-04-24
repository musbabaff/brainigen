'use client';

import { useState, useRef } from 'react';
import { Upload, ImageIcon, FileIcon, Download, Trash2, Copy, Check, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

type MediaFile = {
  name: string;
  id: string;
  metadata: { size: number; mimetype: string } | null;
  created_at: string;
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function MediaLibraryClient({ initialFiles, bucket }: { initialFiles: MediaFile[]; bucket: string }) {
  const [files, setFiles] = useState(initialFiles);
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFiles = Array.from(e.target.files ?? []);
    if (!uploadFiles.length) return;
    setUploading(true);
    for (const file of uploadFiles) {
      const form = new FormData();
      form.append('file', file);
      form.append('bucket', bucket);
      await fetch('/api/admin/media/upload', { method: 'POST', body: form });
    }
    window.location.reload();
  };

  const copyUrl = (filename: string) => {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${filename}`;
    navigator.clipboard.writeText(url);
    setCopied(filename);
    setTimeout(() => setCopied(null), 2000);
  };

  const deleteFile = async (filename: string) => {
    await fetch('/api/admin/media/delete', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ bucket, filename }) });
    setFiles(prev => prev.filter(f => f.name !== filename));
  };

  const isImage = (name: string) => /\.(jpg|jpeg|png|gif|webp|svg|avif)$/i.test(name);
  const totalSize = files.reduce((sum, f) => sum + (f.metadata?.size ?? 0), 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input type="text" placeholder="Search files..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-md bg-surface-2 border border-border text-sm focus:border-brand focus:outline-none" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted">{files.length} files · {formatBytes(totalSize)}</span>
          <button onClick={() => inputRef.current?.click()} disabled={uploading}
            className="inline-flex items-center gap-2 h-9 px-4 bg-foreground text-background rounded-md text-sm font-medium hover:bg-foreground/90 disabled:opacity-50 transition-colors">
            <Upload className="w-4 h-4" />{uploading ? 'Uploading...' : 'Upload'}
          </button>
          <input ref={inputRef} type="file" multiple className="hidden" onChange={handleUpload} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-surface p-16 text-center cursor-pointer" onClick={() => inputRef.current?.click()}>
          <Upload className="w-12 h-12 text-muted mx-auto mb-4 opacity-30" />
          <h3 className="font-semibold mb-2">No files yet</h3>
          <p className="text-muted text-sm">Click to upload or drag files here</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filtered.map(file => (
            <div key={file.id} className="group relative rounded-lg border border-border bg-surface overflow-hidden hover:border-brand/40 transition-colors">
              <div className="aspect-square flex items-center justify-center bg-surface-2">
                {isImage(file.name) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${file.name}`}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FileIcon className="w-8 h-8 text-muted" />
                )}
              </div>
              <div className="p-2">
                <div className="text-xs font-medium truncate" title={file.name}>{file.name}</div>
                <div className="text-[10px] text-muted mt-0.5">{formatBytes(file.metadata?.size ?? 0)}</div>
              </div>
              <div className="absolute inset-0 bg-surface/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => copyUrl(file.name)} className="p-2 rounded-md bg-surface-2 hover:bg-surface border border-border" title="Copy URL">
                  {copied === file.name ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
                <button onClick={() => deleteFile(file.name)} className="p-2 rounded-md bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
