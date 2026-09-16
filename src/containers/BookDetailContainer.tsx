import { useParams } from 'react-router-dom';
import { BookDetailPanel } from '@/components/BookDetailPanel';

export function BookDetailContainer() {
  const params = useParams();
  const id = String(params?.id ?? '');
  return <BookDetailPanel bookId={id} />;
}
