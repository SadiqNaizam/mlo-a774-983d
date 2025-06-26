import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const FooterLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
    <Link to={to} className="text-sm text-muted-foreground transition-colors hover:text-primary">
        {children}
    </Link>
);

const MainFooter: React.FC = () => {
    console.log('MainFooter loaded');
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-muted/40 border-t">
            <div className="container py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand and Socials */}
                    <div className="flex flex-col gap-4 items-start">
                        <Link to="/" className="flex items-center gap-2">
                            <Mountain className="h-6 w-6" />
                            <span className="text-lg font-bold">WanderEase India</span>
                        </Link>
                        <p className="text-muted-foreground text-sm">
                            Your trusted partner for exploring the beauty of India.
                        </p>
                        <div className="flex gap-4 mt-2">
                           <Link to="#" aria-label="Facebook"><Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
                           <Link to="#" aria-label="Twitter"><Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
                           <Link to="#" aria-label="Instagram"><Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
                           <Link to="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" /></Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-3">
                        <h3 className="font-semibold text-foreground">Quick Links</h3>
                        <FooterLink to="/packages">Packages</FooterLink>
                        <FooterLink to="/offers">Offers</FooterLink>
                        <FooterLink to="/trip-cost-estimator">Trip Cost Estimator</FooterLink>
                        <FooterLink to="/booking">My Bookings</FooterLink>
                    </div>

                    {/* Company */}
                    <div className="flex flex-col gap-3">
                        <h3 className="font-semibold text-foreground">Company</h3>
                        <FooterLink to="#">About Us</FooterLink>
                        <FooterLink to="#">Contact</FooterLink>
                        <FooterLink to="#">Careers</FooterLink>
                        <FooterLink to="#">Blog</FooterLink>
                    </div>

                    {/* Legal */}
                    <div className="flex flex-col gap-3">
                        <h3 className="font-semibold text-foreground">Legal</h3>
                        <FooterLink to="#">Privacy Policy</FooterLink>
                        <FooterLink to="#">Terms & Conditions</FooterLink>
                        <FooterLink to="#">Cookie Policy</FooterLink>
                    </div>
                </div>

                <div className="border-t pt-8">
                    <p className="text-center text-sm text-muted-foreground">
                        &copy; {currentYear} WanderEase India. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default MainFooter;