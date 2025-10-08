export default function LoaderSpinner() {
  return (
    <div className="p-4 flex justify-center items-center">
      <span className="animate-spin inline-block h-6 w-6 border-4 border-t-red-400 border-gray-200 rounded-full"></span>
    </div>
  );
}
