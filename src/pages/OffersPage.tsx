import React from 'react';
import MainHeader from '@/components/layout/MainHeader';
import MainFooter from '@/components/layout/MainFooter';
import OfferBanner from '@/components/OfferBanner';
import PackageCard from '@/components/PackageCard';

const specialOffers = [
  {
    slug: 'goa-sun-kissed-deal',
    title: 'Sun-Kissed Goa Getaway - 15% Off',
    price: 15999,
    highlights: ['4-Star Beachside Hotel', 'Water Sports Included', 'Daily Breakfast'],
    imageUrl: 'https://images.unsplash.com/photo-1590372782754-08a8e835b369?q=80&w=1974&auto=format&fit=crop',
  },
  {
    slug: 'rajasthan-royal-tour',
    title: 'Royal Rajasthan Heritage Tour',
    price: 24999,
    highlights: ['Stay in Heritage Havelis', 'Jodhpur & Udaipur', 'Camel Safari'],
    imageUrl: 'https://images.unsplash.com/photo-1603299733362-62ac54193d56?q=80&w=2070&auto=format&fit=crop',
  },
  {
    slug: 'andaman-scuba-special',
    title: 'Andaman Islands Paradise Package',
    price: 29999,
    highlights: ['PADI Scuba Session', 'Beachfront Resort Stay', 'Neil Island Ferry'],
    imageUrl: 'https://images.unsplash.com/photo-1616484173745-07f25fd05474?q=80&w=2070&auto=format&fit=crop',
  },
  {
    slug: 'manali-winter-escape',
    title: 'Manali Winter Escape',
    price: 18500,
    highlights: ['Solang Valley Snow Point', 'Cozy Cottage Stay', 'Old Manali Cafe Tour'],
    imageUrl: 'https://images.unsplash.com/photo-1610966596955-531c3609aa8e?q=80&w=1935&auto=format&fit=crop',
  },
  {
    slug: 'coorg-coffee-plantation',
    title: 'Coorg: Coffee Plantation Retreat',
    price: 21000,
    highlights: ['Luxury Plantation Stay', 'Coffee Tasting Tour', 'Abbey Falls Visit'],
    imageUrl: 'https://images.unsplash.com/photo-1601754095094-1a48c7728f32?q=80&w=1974&auto=format&fit=crop',
  },
  {
    slug: 'rishikesh-yoga-adventure',
    title: 'Rishikesh Yoga & Adventure',
    price: 17999,
    highlights: ['Daily Yoga Sessions', 'Ganga River Rafting', 'Evening Aarti Ceremony'],
    imageUrl: 'https://images.unsplash.com/photo-1598214886806-2586b54b9148?q=80&w=2070&auto=format&fit=crop',
  },
];


const OffersPage = () => {
  console.log('OffersPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <MainHeader />

      <main className="flex-grow">
        <div className="container py-8 md:py-12">
          {/* Main Offer Banner */}
          <section className="mb-12">
            <OfferBanner
              title="Monsoon Magic in Kerala"
              description="Get a flat 20% discount on all Kerala backwater and Munnar packages. Experience the magic of the rains in God's Own Country."
              ctaText="Explore Kerala Deals"
              ctaLink="/packages?destination=kerala"
            />
          </section>

          {/* Grid of other offers */}
          <section>
            <h2 className="text-3xl font-bold tracking-tight text-center mb-4 text-gray-800">
              More Deals & Discounts
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Explore our handpicked collection of special offers across India. Unforgettable journeys at unbeatable prices.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {specialOffers.map((pkg) => (
                <PackageCard
                  key={pkg.slug}
                  slug={pkg.slug}
                  title={pkg.title}
                  price={pkg.price}
                  highlights={pkg.highlights}
                  imageUrl={pkg.imageUrl}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <MainFooter />
    </div>
  );
};

export default OffersPage;