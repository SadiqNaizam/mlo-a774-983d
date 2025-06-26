import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

interface PackageCardProps {
  imageUrl: string;
  title: string;
  price: number;
  highlights: string[];
  slug: string; // Used for navigation, e.g., to a detail page
}

const PackageCard: React.FC<PackageCardProps> = ({
  imageUrl,
  title,
  price,
  highlights,
  slug,
}) => {
  console.log('PackageCard loaded for:', title);

  return (
    <Link to={`/booking?package=${slug}`} className="block group outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
        <CardHeader className="p-0 relative">
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={imageUrl || 'https://via.placeholder.com/400x300'}
              alt={`Image of ${title}`}
              className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
          </div>
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 ease-in-out flex items-center justify-center">
            <div className="text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              <h4 className="font-semibold mb-2 text-lg">Package Inclusions</h4>
              <ul className="space-y-1.5 text-sm">
                {highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-2">{title}</h3>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="w-full flex justify-between items-baseline">
            <p className="text-sm text-gray-500">Starts from</p>
            <p className="text-2xl font-extrabold text-teal-700">
              ₹{price.toLocaleString('en-IN')}
            </p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PackageCard;