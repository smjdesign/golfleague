// File: components/LoadingSkeletonCard.js
export default function LoadingSkeletonCard() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
      <div className="h-48 bg-green-100"></div>
      <div className="p-6">
        <div className="h-6 bg-green-100 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-green-50 rounded w-full mb-2"></div>
        <div className="h-4 bg-green-50 rounded w-2/3 mb-6"></div>
        <div className="h-10 bg-green-100 rounded w-full"></div>
      </div>
    </div>
  );
}