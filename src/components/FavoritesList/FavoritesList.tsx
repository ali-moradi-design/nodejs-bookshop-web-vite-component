import { Link } from 'react-router-dom';
import type { Favorite } from '@/types/favorite';
import { RemoveFavoriteButton } from '@/components/RemoveFavoriteButton';
import { formatMoney } from '@/utils';

type Props = {
  favorites: Favorite[];
  locale: string;
};

export function FavoritesList({ favorites, locale }: Props) {
  return (
    <ul className="divide-y rounded-xl border bg-card">
      {favorites.map((fav) => (
        <li key={fav.id} className="flex items-center justify-between gap-3 p-4">
          <div>
            <Link to={`/books/${fav.bookId}`} className="font-medium text-primary hover:underline">
              {fav.populated?.book?.title || fav.bookId}
            </Link>
            <p className="text-sm text-muted-foreground">
              {fav.populated?.book?.author}
              {fav.populated?.book?.price != null
                ? ` · ${formatMoney(fav.populated.book.price, 'USD', locale)}`
                : ''}
            </p>
          </div>
          <RemoveFavoriteButton bookId={fav.bookId} />
        </li>
      ))}
    </ul>
  );
}
