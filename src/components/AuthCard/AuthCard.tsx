type Props = {
  children: React.ReactNode;
  className?: string;
};

/** Centered auth screen shell used by login/register containers. */
export function AuthCard({ children, className }: Props) {
  return (
    <div className={className ?? 'mx-auto flex min-h-[70vh] max-w-md items-center px-4'}>
      {children}
    </div>
  );
}
