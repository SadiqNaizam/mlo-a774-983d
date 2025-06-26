import React, { useState } from 'react';

// Custom Components
import MainHeader from '@/components/layout/MainHeader';
import MainFooter from '@/components/layout/MainFooter';
import PackageCard from '@/components/PackageCard';

// shadcn/ui Components
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search, SlidersHorizontal } from 'lucide-react';

// Placeholder data for packages
const samplePackages = [
  {
    slug: 'kerala-backwaters-bliss',
    title: 'Kerala Backwaters Bliss: Houseboat & Tea Gardens',
    price: 25000,
    highlights: ['5 Nights Stay', 'Houseboat Cruise', 'All Meals Included', 'Tea Plantation Tour'],
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=870&auto=format&fit=crop',
  },
  {
    slug: 'majestic-rajasthan-forts',
    title: 'Majestic Rajasthan: Forts, Palaces & Deserts',
    price: 35000,
    highlights: ['7 Nights Stay', 'Jaipur & Udaipur Tours', 'Camel Safari', '4-Star Hotels'],
    imageUrl: 'https://images.unsplash.com/photo-1599661046227-14e9a4489953?q=80&w=774&auto=format&fit=crop',
  },
  {
    slug: 'himalayan-adventure-leh',
    title: 'Himalayan Adventure: A Trip to Leh-Ladakh',
    price: 45000,
    highlights: ['8 Nights Stay', 'Pangong Lake Visit', 'Bike Rental Included', 'Permits & Guide'],
    imageUrl: 'https://images.unsplash.com/photo-1610466024944-098c6a6c39a3?q=80&w=870&auto=format&fit=crop',
  },
  {
    slug: 'serene-goa-beaches',
    title: 'Serene Goa: Sun, Sand, and Relaxation',
    price: 18000,
    highlights: ['4 Nights Stay', 'Beachfront Resort', 'Watersports Voucher', 'Daily Breakfast'],
    imageUrl: 'https://images.unsplash.com/photo-1590372793661-33f7f8979a7a?q=80&w=870&auto=format&fit=crop',
  },
  {
    slug: 'spiritual-varanasi-journey',
    title: 'Spiritual Varanasi: Ghats and Ganga Aarti',
    price: 22000,
    highlights: ['3 Nights Stay', 'Guided Temple Tour', 'Evening Ganga Aarti', 'Boat Ride'],
    imageUrl: 'https://images.unsplash.com/photo-1561361521-19265695955a?q=80&w=870&auto=format&fit=crop',
  },
  {
    slug: 'wildlife-safari-jim-corbett',
    title: 'Wildlife Safari at Jim Corbett National Park',
    price: 28000,
    highlights: ['3 Nights Stay', '2 Jeep Safaris', 'Jungle Resort Stay', 'All Meals'],
    imageUrl: 'https://images.unsplash.com/photo-1549468047-52e5b9f4ce62?q=80&w=870&auto=format&fit=crop',
  },
];

const travelThemes = [
  { id: 'adventure', label: 'Adventure' },
  { id: 'beach', label: 'Beach' },
  { id: 'cultural', label: 'Cultural' },
  { id: 'honeymoon', label: 'Honeymoon' },
  { id: 'wildlife', label: 'Wildlife' },
  { id: 'spiritual', label: 'Spiritual' },
];

const PackagesPage = () => {
  console.log('PackagesPage loaded');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <MainHeader />
      <main className="container py-8 md:py-12 flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-900">Discover Your Next Adventure</h1>
          <p className="mt-4 text-lg text-muted-foreground">Browse our curated travel packages or use the filters to find your perfect trip.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5" />
                    Filter & Sort
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search packages..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Sort */}
                  <div>
                    <Label htmlFor="sort-by">Sort by</Label>
                    <Select defaultValue="popularity">
                      <SelectTrigger id="sort-by" className="w-full">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popularity">Popularity</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                        <SelectItem value="duration">Duration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Themes */}
                  <div>
                    <h4 className="font-semibold mb-3">Travel Theme</h4>
                    <div className="space-y-2">
                      {travelThemes.map(theme => (
                        <div key={theme.id} className="flex items-center space-x-2">
                          <Checkbox id={theme.id} />
                          <Label htmlFor={theme.id} className="font-normal cursor-pointer">{theme.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full" variant="secondary">Reset Filters</Button>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Packages Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {samplePackages.length} curated packages.
            </div>
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {samplePackages.map(pkg => (
                <PackageCard key={pkg.slug} {...pkg} />
              ))}
            </section>
            
            {/* Pagination */}
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </main>
      <MainFooter />
    </div>
  );
};

export default PackagesPage;