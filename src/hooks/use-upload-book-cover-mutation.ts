import { useMutation } from '@tanstack/react-query';
import { uploadBookCover } from '@/services/book';

export function useUploadBookCoverMutation() {
  return useMutation({
    mutationFn: (file: File) => uploadBookCover(file),
  });
}
