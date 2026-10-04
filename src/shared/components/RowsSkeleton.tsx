export default function RowsSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div aria-busy="true" aria-label="Loading" className="divide-y divide-graphite border-y border-graphite">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex items-center gap-6 py-4">
          <div className="h-4 w-48 animate-pulse rounded-sm bg-graphite" />
          <div className="h-4 w-24 animate-pulse rounded-sm bg-graphite" />
          <div className="ml-auto h-4 w-20 animate-pulse rounded-sm bg-graphite" />
        </div>
      ))}
    </div>
  );
}
