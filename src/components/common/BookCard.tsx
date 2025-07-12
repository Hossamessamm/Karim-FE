import React from 'react';
import { Book } from '../../services/bookService';
import WhatsAppButton from './WhatsAppButton';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {

  // Helper function to get grade in Arabic
  const getGradeInArabic = (grade: string) => {
    switch (grade) {
      case 'Secondary1':
        return 'الصف الأول الثانوي';
      case 'Secondary2':
        return 'الصف الثاني الثانوي';
      case 'Secondary3':
        return 'الصف الثالث الثانوي';
      default:
        return grade;
    }
  };

  // Handle missing or invalid image paths
  const getImageSrc = () => {
    if (book.imagePath) {
      // If imagePath is a relative path, prepend the API base URL
      if (book.imagePath.startsWith('/') || book.imagePath.startsWith('images/')) {
        return `https://api.ibrahim-magdy.com/${book.imagePath}`;
      }
      // If it's already a full URL, use it as is
      if (book.imagePath.startsWith('http')) {
        return book.imagePath;
      }
      // Otherwise, assume it's relative to the API base
      return `https://api.ibrahim-magdy.com/${book.imagePath}`;
    }
    // Fallback to a default image if no image path is provided
    return require('../../assets/images/teachers/images.jpg');
  };

  return (
    <div className="group bg-white rounded-2xl shadow-md border border-slate-100 p-6 flex flex-col gap-4 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 transform hover:-translate-y-1">
      {/* Book Image */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={getImageSrc()}
          alt={book.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            // Fallback to default image if the API image fails to load
            const target = e.target as HTMLImageElement;
            target.src = require('../../assets/images/teachers/images.jpg');
          }}
        />
        {/* Grade Badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
          {getGradeInArabic(book.grade)}
        </div>
      </div>

      {/* Book Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-purple-600 transition-colors duration-200">
          {book.title}
        </h3>
        
        {book.description && (
          <p className="text-slate-600 text-sm mb-4 flex-1 line-clamp-3">
            {book.description}
          </p>
        )}

        {/* Price and Action */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-purple-600">
              {book.price} جنيه
            </span>
            <span className="text-xs text-slate-500">السعر شامل الضريبة</span>
          </div>
          
          <WhatsAppButton
            message={`مرحباً، أريد الاستفسار عن هذا الكتاب: ${book.title}`}
            size="lg"
            showText={true}
          />
        </div>
      </div>
    </div>
  );
};

export default BookCard; 