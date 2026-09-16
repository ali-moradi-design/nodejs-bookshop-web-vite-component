import type { Book } from '@/types/book';
import { BookCard } from '@/components/BookCard';
import { BookCardSkeleton } from '@/components/BookCardSkeleton';
import { FavoriteToggleButton } from '@/components/FavoriteToggleButton';

type Props = {
  books: Book[];
  withFavorites?: boolean;
  isAuthenticated?: boolean;
  renderActions?: (book: Book) => React.ReactNode;
};

export function BookGrid({
  books,
  withFavorites = false,
  isAuthenticated = false,
  renderActions,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {books.map((book) => {
        const actions =
          renderActions?.(book) ??
          (withFavorites ? (
            <FavoriteToggleButton bookId={book.id} compact isAuthenticated={isAuthenticated} />
          ) : undefined);
        return <BookCard key={book.id} book={book} actions={actions} />;
      })}
    </div>
  );
}

type SkeletonProps = { count?: number };

export function BookGridSkeleton({ count = 10 }: SkeletonProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: count }, (_, i) => (
        <BookCardSkeleton key={i} />
      ))}
    </div>
  );
}
