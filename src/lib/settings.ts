import { createClient } from '@/lib/supabase/server';
import { encrypt, decrypt } from '@/lib/crypto';

/**
 * Get a setting from site_settings table.
 * Falls back to environment variable if not in DB.
 * Decrypts if marked as encrypted.
 */
export async function getSetting(key: string, fallback?: string): Promise<string | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('site_settings')
      .select('value, encrypted')
      .eq('key', key)
      .single();

    if (data && data.value !== null) {
      const rawValue = typeof data.value === 'string' ? data.value : JSON.stringify(data.value);
      // Unwrap JSON string
      const strValue = data.value?.startsWith?.('"') ? JSON.parse(data.value) : rawValue;

      if (data.encrypted) {
        try {
          return decrypt(strValue);
        } catch {
          return fallback ?? null;
        }
      }
      return strValue;
    }
  } catch {
    // Table might not exist yet or no access
  }

  // Fallback to environment variable
  const envKey = key.toUpperCase();
  return process.env[envKey] ?? fallback ?? null;
}

/**
 * Get a JSON setting from site_settings table.
 */
export async function getSettingJson<T = unknown>(key: string, fallback?: T): Promise<T | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', key)
      .single();

    if (data && data.value !== null) {
      return data.value as T;
    }
  } catch {
    // ignore
  }
  return fallback ?? null;
}

/**
 * Save a setting to site_settings table.
 * Encrypts if options.encrypted is true.
 */
export async function setSetting(
  key: string,
  value: string | object | boolean | number | null,
  options: {
    encrypted?: boolean;
    category?: string;
    description?: string;
    updatedBy?: string;
  } = {}
): Promise<void> {
  const supabase = await createClient();

  let storedValue: string;
  if (options.encrypted && typeof value === 'string' && value) {
    storedValue = JSON.stringify(encrypt(value));
  } else {
    storedValue = JSON.stringify(value);
  }

  await supabase.from('site_settings').upsert({
    key,
    value: storedValue,
    encrypted: options.encrypted ?? false,
    category: options.category ?? 'general',
    description: options.description,
    updated_by: options.updatedBy,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'key' });
}

/**
 * Get all settings for a category
 */
export async function getSettingsByCategory(category: string): Promise<Record<string, { value: string | null; encrypted: boolean }>> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('site_settings')
    .select('key, value, encrypted')
    .eq('category', category);

  const result: Record<string, { value: string | null; encrypted: boolean }> = {};
  for (const row of data ?? []) {
    let displayValue: string | null = null;
    if (!row.encrypted && row.value !== null) {
      try {
        displayValue = JSON.parse(row.value);
      } catch {
        displayValue = row.value;
      }
    }
    result[row.key] = { value: displayValue, encrypted: row.encrypted };
  }
  return result;
}
