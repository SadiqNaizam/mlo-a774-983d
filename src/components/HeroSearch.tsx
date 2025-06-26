import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Calendar as CalendarIcon,
  Users,
  Minus,
  Plus,
} from "lucide-react";

const HeroSearch = () => {
  const navigate = useNavigate();
  console.log("HeroSearch component loaded");

  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [travelers, setTravelers] = useState({ adults: 2, children: 0 });

  const handleSearch = () => {
    const searchParams = {
      destination,
      date,
      travelers,
    };
    console.log("Performing search with params:", searchParams);
    // Navigate to packages page, potentially with query params in a real app
    navigate("/packages");
  };

  const handleTravelerChange = (
    type: "adults" | "children",
    operation: "increment" | "decrement"
  ) => {
    setTravelers((prev) => {
      const currentValue = prev[type];
      const newValue =
        operation === "increment"
          ? currentValue + 1
          : Math.max(type === "adults" ? 1 : 0, currentValue - 1);
      return { ...prev, [type]: newValue };
    });
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm p-4 lg:p-6 rounded-lg shadow-lg w-full max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Destination Input */}
        <div className="lg:col-span-4 flex items-center gap-2">
          <MapPin className="text-gray-500 h-6 w-6" />
          <div className="w-full">
            <Label htmlFor="destination" className="font-semibold text-gray-700">
              Destination
            </Label>
            <Input
              id="destination"
              type="text"
              placeholder="e.g., Goa, Kerala, Rajasthan"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 text-base"
            />
          </div>
        </div>
        <Separator orientation="vertical" className="hidden lg:block h-10" />

        {/* Date Picker */}
        <div className="lg:col-span-3 flex items-center gap-2">
          <CalendarIcon className="text-gray-500 h-6 w-6" />
          <div className="w-full">
            <Label className="font-semibold text-gray-700">Dates</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"ghost"}
                  className={cn(
                    "w-full justify-start text-left font-normal p-0 h-auto hover:bg-transparent",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <Separator orientation="vertical" className="hidden lg:block h-10" />

        {/* Travelers Popover */}
        <div className="lg:col-span-3 flex items-center gap-2">
          <Users className="text-gray-500 h-6 w-6" />
          <div className="w-full">
            <Label className="font-semibold text-gray-700">Travelers</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="w-full justify-start text-left font-normal p-0 h-auto hover:bg-transparent">
                  {travelers.adults} Adults
                  {travelers.children > 0 && `, ${travelers.children} Children`}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60 p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="adults">Adults</Label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleTravelerChange("adults", "decrement")}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-6 text-center">{travelers.adults}</span>
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleTravelerChange("adults", "increment")}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="children">Children</Label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleTravelerChange("children", "decrement")}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-6 text-center">{travelers.children}</span>
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleTravelerChange("children", "increment")}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Search Button */}
        <div className="lg:col-span-2">
          <Button
            size="lg"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSearch;