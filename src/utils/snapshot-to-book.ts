import type { Book } from '@/types/book';
import type { RecentBookSnapshot } from '@/utils';

/** Map a local recently-viewed snapshot to a Book-shaped object for BookCard. */
export function snapshotToBook(s: RecentBookSnapshot): Book {
  return {
    id: s.id,
    title: s.title,
    author: s.author,
    description: '',
    price: s.price,
    currency: s.currency,
    stock: 1,
    coverImageUrl: s.coverImageUrl,
    featured: false,
    createdAt: new Date(s.viewedAt).toISOString(),
    updatedAt: new Date(s.viewedAt).toISOString(),
  };
}
