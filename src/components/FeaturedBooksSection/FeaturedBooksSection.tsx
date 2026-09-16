import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import type { Book } from '@/types/book';
import { BookGrid, BookGridSkeleton } from '@/components/BookGrid';
import { Alert } from '@/components/Alert';
import { EmptyState } from '@/components/EmptyState';

type Props = {
  books?: Book[];
  isLoading?: boolean;
  errorMessage?: string | null;
  onRetry?: () => void;
  isAuthenticated?: boolean;
};

export function FeaturedBooksSection({
  books,
  isLoading,
  errorMessage,
  onRetry,
  isAuthenticated = false,
}: Props) {
  const { t } = useTranslation();

  return (
    <motion.section
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.h2
        className="text-xl font-semibold"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.05 }}
      >
        {t('home.featured')}
      </motion.h2>
      {isLoading ? <BookGridSkeleton count={5} /> : null}
      {errorMessage ? (
        <Alert variant="destructive">
          {errorMessage}{' '}
          {onRetry ? (
            <button type="button" className="underline" onClick={onRetry}>
              {t('common.retry')}
            </button>
          ) : null}
        </Alert>
      ) : null}
      {!isLoading && !errorMessage && (!books || books.length === 0) ? (
        <EmptyState title={t('common.empty')} description={t('catalog.noResults')} />
      ) : null}
      {books && books.length > 0 ? (
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-20px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06 } },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
            }}
          >
            <BookGrid books={books} withFavorites isAuthenticated={isAuthenticated} />
          </motion.div>
        </motion.div>
      ) : null}
    </motion.section>
  );
}
