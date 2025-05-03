export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
      <span className="text-lg font-medium text-gray-700">
        Fetching the latest IPL data... Please wait
      </span>
    </div>
  );
}

