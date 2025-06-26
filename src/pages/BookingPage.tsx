import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';

import MainHeader from '@/components/layout/MainHeader';
import MainFooter from '@/components/layout/MainFooter';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard, User, Mail, Phone } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const bookingFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  travelers: z.string().min(1, { message: "Please select the number of travelers." }),
  cardholderName: z.string().min(2, { message: "Cardholder name is required." }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: "Card number must be 16 digits." }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Use MM/YY format." }),
  cvc: z.string().regex(/^\d{3,4}$/, { message: "CVC must be 3 or 4 digits." }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const BookingPage: React.FC = () => {
  console.log('BookingPage loaded');
  const { toast } = useToast();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      travelers: "1",
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    },
  });

  function onSubmit(data: BookingFormValues) {
    console.log("Form Submitted:", data);
    toast({
      title: "Booking Submitted!",
      description: "We have received your booking details. A confirmation email is on its way.",
    });
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <MainHeader />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-10">
            <h1 className="text-4xl font-bold tracking-tight">Complete Your Booking</h1>
            <p className="text-muted-foreground mt-2">Securely enter your details to finalize your dream trip.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Traveler Information</CardTitle>
                                <CardDescription>Please enter the details of the lead traveler.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., Anjali Sharma" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="example@email.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="+91 98765 43210" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="travelers"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Number of Travelers</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger><SelectValue placeholder="Select number of travelers" /></SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {[...Array(5)].map((_, i) => (
                                                        <SelectItem key={i + 1} value={String(i + 1)}>{i + 1} Traveler{i > 0 ? 's' : ''}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                             <CardHeader>
                                <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5"/> Payment Details</CardTitle>
                                <CardDescription>All transactions are secure and encrypted.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                               <FormField control={form.control} name="cardholderName" render={({ field }) => (
                                   <FormItem><FormLabel>Cardholder Name</FormLabel><FormControl><Input placeholder="Name as on card" {...field} /></FormControl><FormMessage /></FormItem>
                               )} />
                                <FormField control={form.control} name="cardNumber" render={({ field }) => (
                                   <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="0000 0000 0000 0000" {...field} /></FormControl><FormMessage /></FormItem>
                               )} />
                                <div className="grid grid-cols-2 gap-4">
                                     <FormField control={form.control} name="expiryDate" render={({ field }) => (
                                        <FormItem><FormLabel>Expiry Date</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                     <FormField control={form.control} name="cvc" render={({ field }) => (
                                        <FormItem><FormLabel>CVC</FormLabel><FormControl><Input placeholder="123" {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                </div>
                            </CardContent>
                        </Card>

                        <Button type="submit" size="lg" className="w-full">Confirm & Pay</Button>
                    </form>
                </Form>
            </div>
            <div className="lg:col-span-1">
                <Card className="sticky top-24">
                    <CardHeader>
                        <CardTitle>Booking Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <img src="https://images.unsplash.com/photo-1596422849543-83b33135a3a1?q=80&w=1974&auto=format&fit=crop" alt="Jaipur" className="rounded-lg mb-4" />
                        <div className="flex justify-between font-semibold">
                            <span>Package</span>
                            <span>Golden Triangle Discovery</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-muted-foreground">
                            <span>Dates</span>
                            <span>Oct 15 - Oct 22, 2024</span>
                        </div>
                         <div className="flex justify-between text-muted-foreground">
                            <span>Travelers</span>
                            <span>2 Adults</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total Price</span>
                            <span>₹85,000</span>
                        </div>
                         <p className="text-xs text-muted-foreground pt-2">By clicking 'Confirm & Pay', you agree to the WanderEase India <Link to="#" className="underline">Terms & Conditions</Link> and <Link to="#" className="underline">Privacy Policy</Link>.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
      <MainFooter />
    </div>
  );
};

export default BookingPage;