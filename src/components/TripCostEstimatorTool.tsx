import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimate } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

import { BedDouble, Car, IndianRupee, MapPin, Plane, Train, Users } from 'lucide-react';

// --- Helper Component for Animated Number ---
const AnimatedNumber = ({ value }: { value: number }) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(scope.current, { innerHTML: Math.round(value) }, { duration: 0.8, ease: "easeOut" });
  }, [value, animate, scope]);

  return <span ref={scope}>{Math.round(value)}</span>;
};

// --- Main Component ---
const TripCostEstimatorTool: React.FC = () => {
  console.log('TripCostEstimatorTool loaded');
  const navigate = useNavigate();

  // --- State Management ---
  const [destination, setDestination] = useState<string>('Goa');
  const [travelers, setTravelers] = useState<number>(2);
  const [nights, setNights] = useState<number>(5);

  const [services, setServices] = useState({
    hotel: true,
    flights: false,
    train: false,
    cab: true,
  });

  const [hotelStars, setHotelStars] = useState<number>(3);
  const [flightOrigin, setFlightOrigin] = useState<string>('Mumbai');

  const [totalCost, setTotalCost] = useState<number>(0);

  // --- Cost Calculation Logic ---
  const calculateTotalCost = useCallback(() => {
    let cost = 0;

    // Base cost per person
    cost += travelers * 1500;

    // Hotel cost
    if (services.hotel) {
      const starCost = [1500, 2500, 4000, 7000, 12000];
      cost += nights * (starCost[hotelStars - 1] || 4000) * Math.ceil(travelers / 2);
    }

    // Flight cost
    if (services.flights) {
      // Dummy costs for flights
      const flightBaseCost = destination === 'Kerala' || destination === 'Andaman' ? 8000 : 5000;
      cost += travelers * flightBaseCost;
    }

    // Train cost
    if (services.train) {
      cost += travelers * 1200;
    }

    // Cab cost for local travel
    if (services.cab) {
      cost += nights * 2000;
    }

    setTotalCost(cost);
  }, [destination, travelers, nights, services, hotelStars, flightOrigin]);

  useEffect(() => {
    calculateTotalCost();
  }, [calculateTotalCost]);

  const handleServiceToggle = (service: keyof typeof services) => {
    setServices(prev => ({ ...prev, [service]: !prev[service] }));
  };
  
  const handleFindPackages = () => {
    // In a real app, you might pass the budget as a query param
    // e.g., navigate(`/packages?maxBudget=${totalCost}`);
    navigate('/packages');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl shadow-gray-200/50">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">Trip Cost Estimator</CardTitle>
        <CardDescription>Craft your perfect Indian getaway. Adjust options to see a live cost estimate.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* --- LEFT COLUMN: CONTROLS --- */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="destination" className="text-lg font-semibold flex items-center mb-2"><MapPin className="mr-2 h-5 w-5 text-gray-500" /> Destination</Label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger id="destination"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Goa">Goa</SelectItem>
                  <SelectItem value="Kerala">Kerala</SelectItem>
                  <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                  <SelectItem value="Himachal">Himachal Pradesh</SelectItem>
                  <SelectItem value="Andaman">Andaman & Nicobar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Label className="text-lg font-semibold flex items-center"><Users className="mr-2 h-5 w-5 text-gray-500" /> Trip Details</Label>
              <div>
                <Label htmlFor="travelers" className="text-sm">Travelers: {travelers}</Label>
                <Slider id="travelers" value={[travelers]} onValueChange={(val) => setTravelers(val[0])} min={1} max={10} step={1} />
              </div>
              <div>
                <Label htmlFor="nights" className="text-sm">Nights: {nights}</Label>
                <Slider id="nights" value={[nights]} onValueChange={(val) => setNights(val[0])} min={2} max={30} step={1} />
              </div>
            </div>

            <Separator />
            
            <div>
              <Label className="text-lg font-semibold mb-3 block">Included Services</Label>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <Label htmlFor="hotel-toggle" className="flex items-center font-medium"><BedDouble className="mr-3 h-5 w-5 text-blue-500" /> Hotel</Label>
                  <Switch id="hotel-toggle" checked={services.hotel} onCheckedChange={() => handleServiceToggle('hotel')} />
                </div>
                {services.hotel && (
                  <div className="pl-6 ml-3 border-l-2 space-y-2 py-2">
                    <Label htmlFor="hotel-stars" className="text-sm">Star Rating: {hotelStars} ★</Label>
                    <Slider id="hotel-stars" value={[hotelStars]} onValueChange={(val) => setHotelStars(val[0])} min={1} max={5} step={1} />
                  </div>
                )}

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <Label htmlFor="flights-toggle" className="flex items-center font-medium"><Plane className="mr-3 h-5 w-5 text-purple-500" /> Flights</Label>
                  <Switch id="flights-toggle" checked={services.flights} onCheckedChange={() => handleServiceToggle('flights')} />
                </div>
                {services.flights && (
                   <div className="pl-6 ml-3 border-l-2 py-2">
                    <Label htmlFor="flight-origin" className="text-sm mb-2 block">Origin City</Label>
                    <Select value={flightOrigin} onValueChange={setFlightOrigin}>
                      <SelectTrigger id="flight-origin"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mumbai">Mumbai</SelectItem>
                        <SelectItem value="Delhi">Delhi</SelectItem>
                        <SelectItem value="Bangalore">Bangalore</SelectItem>
                        <SelectItem value="Kolkata">Kolkata</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <Label htmlFor="train-toggle" className="flex items-center font-medium"><Train className="mr-3 h-5 w-5 text-green-500" /> Train</Label>
                  <Switch id="train-toggle" checked={services.train} onCheckedChange={() => handleServiceToggle('train')} />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <Label htmlFor="cab-toggle" className="flex items-center font-medium"><Car className="mr-3 h-5 w-5 text-orange-500" /> Local Cab</Label>
                  <Switch id="cab-toggle" checked={services.cab} onCheckedChange={() => handleServiceToggle('cab')} />
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: SUMMARY --- */}
          <div className="bg-gray-50 rounded-xl p-6 md:p-8 flex flex-col justify-center items-center text-center sticky top-24 h-fit">
              <p className="text-lg font-medium text-gray-600">Estimated Total Cost</p>
              <div className="flex items-baseline my-2">
                <IndianRupee className="h-10 w-10 text-gray-800" strokeWidth={2.5}/>
                <p className="text-6xl font-bold tracking-tighter text-gray-900">
                    <AnimatedNumber value={totalCost} />
                </p>
              </div>
              <p className="text-sm text-gray-500">for {travelers} traveler{travelers > 1 ? 's' : ''}, {nights} nights</p>

              <Button size="lg" className="w-full mt-8" onClick={handleFindPackages}>Find Matching Packages</Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-500 text-center w-full">This is an estimate. Prices may vary based on availability and seasonality.</p>
      </CardFooter>
    </Card>
  );
};

export default TripCostEstimatorTool;