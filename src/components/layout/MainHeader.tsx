import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Mountain, Menu, User } from 'lucide-react';

const MainHeader: React.FC = () => {
  console.log('MainHeader loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary' : 'text-muted-foreground'
    }`;

  const MobileNavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <SheetClose asChild>
      <NavLink to={to} className={navLinkClasses}>
        {children}
      </NavLink>
    </SheetClose>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Mountain className="h-6 w-6" />
          <span className="font-bold">WanderEase India</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/packages" className={navLinkClasses}>
            Packages
          </NavLink>
          <NavLink to="/offers" className={navLinkClasses}>
            Offers
          </NavLink>
          <NavLink to="/trip-cost-estimator" className={navLinkClasses}>
            Trip Cost Estimator
          </NavLink>
        </nav>

        {/* Auth & Mobile Menu Trigger */}
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:flex items-center gap-2">
            <User className="h-4 w-4" />
            Login
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 pt-10">
                <Link to="/" className="flex items-center gap-2 mb-4">
                  <Mountain className="h-6 w-6" />
                  <span className="font-bold">WanderEase India</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  <MobileNavLink to="/packages">Packages</MobileNavLink>
                  <MobileNavLink to="/offers">Offers</MobileNavLink>
                  <MobileNavLink to="/trip-cost-estimator">Trip Cost Estimator</MobileNavLink>
                </nav>
                 <Button className="mt-4 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Login
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;