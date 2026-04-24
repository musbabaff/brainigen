import { createClient } from '@/lib/supabase/server';
import { canAccessAdminPanel } from '@/lib/auth/permissions';
import { NextRequest } from 'next/server';

const ALLOWED_TABLES = ['profiles', 'agents', 'conversations', 'invoices', 'tickets', 'activity_log', 'api_keys', 'kb_articles', 'email_campaigns', 'coupons'];

function toCSV(rows: Record<string, unknown>[]): string {
  if (!rows.length) return '';
  const keys = Object.keys(rows[0]);
  const header = keys.join(',');
  const body = rows.map(row =>
    keys.map(k => {
      const v = row[k];
      const s = v === null || v === undefined ? '' : String(v);
      return `"${s.replace(/"/g, '""')}"`;
    }).join(',')
  );
  return [header, ...body].join('\n');
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || !canAccessAdminPanel(profile.role)) return Response.json({ error: 'Forbidden' }, { status: 403 });

  const { tables, format } = await req.json();
  const validTables = (tables as string[]).filter(t => ALLOWED_TABLES.includes(t));

  if (!validTables.length) return Response.json({ error: 'No valid tables selected' }, { status: 400 });

  const result: Record<string, unknown[]> = {};
  for (const table of validTables) {
    const { data } = await supabase.from(table).select('*').limit(10000);
    result[table] = data ?? [];
  }

  if (format === 'json') {
    return new Response(JSON.stringify(result, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="brainigen-export-${new Date().toISOString().split('T')[0]}.json"`,
      },
    });
  }

  // CSV: return first table as CSV (simplified — full zip would require server-side zipping)
  const firstTable = validTables[0];
  const csv = toCSV(result[firstTable] as Record<string, unknown>[]);
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="${firstTable}-export-${new Date().toISOString().split('T')[0]}.csv"`,
    },
  });
}
