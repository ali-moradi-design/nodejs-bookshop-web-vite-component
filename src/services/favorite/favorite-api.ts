import { apiDelete, apiGet, apiPost } from '@/services/http';
import type { ApiData, ApiMessage } from '@/services/http';
import type { Favorite } from '@/types/favorite';

export const favoriteKeys = {
  all: ['favorites'] as const,
  list: () => [...favoriteKeys.all, 'list'] as const,
};

export const fetchFavorites = () => apiGet<ApiData<Favorite[]>>('/favorites');

export const addFavorite = (bookId: string) => apiPost<ApiData<Favorite>>('/favorites', { bookId });

export const removeFavorite = (bookId: string) => apiDelete<ApiMessage>(`/favorites/${bookId}`);
