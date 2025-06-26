import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Megaphone, Sparkles } from 'lucide-react';

interface OfferBannerProps {
  /** The main headline for the offer. */
  title: string;
  /** A brief description of the promotional deal. */
  description: string;
  /** The text to display on the call-to-action button. */
  ctaText: string;
  /** The destination path for the call-to-action link. */
  ctaLink: string;
}

const OfferBanner: React.FC<OfferBannerProps> = ({
  title,
  description,
  ctaText,
  ctaLink,
}) => {
  console.log('OfferBanner loaded');

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-600 p-8 md:p-12 shadow-lg shadow-cyan-500/30">
      {/* Decorative elements for visual flair */}
      <Sparkles className="absolute -top-8 -left-8 h-32 w-32 text-white/10 opacity-50" />
      <Sparkles className="absolute -bottom-12 -right-0 h-40 w-40 text-white/10 opacity-50 transform rotate-12" />

      <div className="relative z-10 flex flex-col items-start text-white">
        <div className="mb-4 flex items-center gap-3 rounded-full bg-white/20 px-4 py-1 text-sm font-medium">
          <Megaphone className="h-4 w-4" />
          <span>Special Offer</span>
        </div>
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-white drop-shadow-md md:text-4xl">
          {title}
        </h2>
        <p className="mb-6 max-w-2xl text-base text-white/90 md:text-lg">
          {description}
        </p>
        <Button
          asChild
          size="lg"
          className="bg-white font-bold text-teal-600 transition-transform duration-300 ease-in-out hover:bg-gray-100 hover:scale-105"
        >
          <Link to={ctaLink}>{ctaText}</Link>
        </Button>
      </div>
    </div>
  );
};

export default OfferBanner;