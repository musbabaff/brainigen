'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { AlertCircle, Home, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LocaleErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('errors');

  useEffect(() => {
    console.error('[Brainigen Locale Error]', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center space-y-6"
      >
        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 bg-destructive/20 rounded-full blur-2xl animate-pulse" />
          <div className="relative w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-destructive" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{t('title')}</h1>
          <p className="text-muted-foreground">{t('description')}</p>
          {error.digest && (
            <p className="text-xs text-muted-foreground font-mono mt-4">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} className="w-full sm:w-auto gap-2">
            <RotateCcw className="h-4 w-4" />
            {t('retry')}
          </Button>
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full gap-2">
              <Home className="h-4 w-4" />
              {t('back_home')}
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
