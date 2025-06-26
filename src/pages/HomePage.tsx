import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import MainHeader from '@/components/layout/MainHeader';
import MainFooter from '@/components/layout/MainFooter';
import HeroSearch from '@/components/HeroSearch';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Placeholder data for featured destinations
const featuredDestinations = [
  {
    name: 'Jaipur, Rajasthan',
    description: 'The Pink City, a land of palaces, lakes, and vibrant culture.',
    imageUrl: 'https://images.unsplash.com/photo-1617153257329-35a7a3a9b1a5?q=80&w=1935&auto=format&fit=crop',
    link: '/packages?destination=Jaipur',
  },
  {
    name: 'Munnar, Kerala',
    description: 'Lush green tea plantations and breathtaking misty mountains.',
    imageUrl: 'https://images.unsplash.com/photo-1616252994458-01383cb23a7b?q=80&w=1974&auto=format&fit=crop',
    link: '/packages?destination=Munnar',
  },
  {
    name: 'Varanasi, Uttar Pradesh',
    description: 'The spiritual heart of India on the banks of the sacred Ganges.',
    imageUrl: 'https://images.unsplash.com/photo-1561361491-e40034a3b1a4?q=80&w=1974&auto=format&fit=crop',
    link: '/packages?destination=Varanasi',
  },
];

const HomePage: React.FC = () => {
  console.log('HomePage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <MainHeader />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-white text-center">
          <div className="absolute inset-0 -z-10">
            <img
              src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop"
              alt="Beautiful landscape of India"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="container px-4 md:px-6 flex flex-col items-center gap-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Explore the Heart of India
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-white/90">
              Discover and book unforgettable travel experiences with WanderEase.
            </p>
            <HeroSearch />
          </div>
        </section>

        {/* Featured Destinations Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Featured Destinations</h2>
              <p className="mt-2 text-lg text-muted-foreground">Get inspired for your next journey.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDestinations.map((dest) => (
                <Card key={dest.name} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                  <img src={dest.imageUrl} alt={dest.name} className="w-full h-48 object-cover" />
                  <div className="flex flex-col flex-grow">
                    <CardHeader>
                      <CardTitle>{dest.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{dest.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Link to={dest.link} className="w-full">
                        <Button className="w-full" variant="outline">View Packages</Button>
                      </Link>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Special Offers Section */}
        <section className="py-16 lg:py-24 bg-muted/40">
          <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Monsoon Getaway Sale</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Embrace the magic of the monsoons with up to 20% off on select packages. Experience the lush landscapes and vibrant life of India in its most refreshing season.
                </p>
                <Link to="/offers">
                    <Button size="lg" className="mt-6 bg-orange-500 hover:bg-orange-600 text-white">Explore Offers</Button>
                </Link>
            </div>
            <div className="order-1 lg:order-2">
                <img src="https://images.unsplash.com/photo-1593693397649-55e15c324147?q=80&w=1974&auto=format&fit=crop" alt="Monsoon in India" className="rounded-lg shadow-xl w-full h-auto object-cover" />
            </div>
          </div>
        </section>
      </main>
      <MainFooter />
    </div>
  );
};

export default HomePage;