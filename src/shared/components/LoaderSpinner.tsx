export default function LoaderSpinner() {
  return (
    <div className="flex items-center justify-center p-4" role="status" aria-label="Loading">
      <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-graphite border-t-chalk" />
    </div>
  );
}
