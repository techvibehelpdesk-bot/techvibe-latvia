'use client';

export default function ProductCard({ imageUrl, price, title, description, buttonText }) {
  return (
    <div className="w-64 h-80 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">
      <div className="h-48 w-full">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="text-lg font-bold text-gray-900 mb-1">{price}</div>
        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">{description}</p>
        <button className="mt-auto w-full bg-black text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
          {buttonText}
        </button>
      </div>
    </div>
  );
}
