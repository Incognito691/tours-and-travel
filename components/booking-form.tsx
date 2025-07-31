"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Users, Mail, Phone, User, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addBooking } from "@/lib/data";
import type { TravelPackage } from "@/lib/types";
import { EMAILJS_CONFIG, initEmailJS } from "@/lib/emailjs-config";
import jsPDF from "jspdf";

interface BookingFormProps {
  package: TravelPackage;
  onClose: () => void;
}

export default function BookingForm({
  package: pkg,
  onClose,
}: BookingFormProps) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    adults: 2,
    children: 0,
    checkIn: "",
    checkOut: "",
    specialRequests: "",
  });

  const totalPrice =
    (bookingData.adults + bookingData.children * 0.7) * pkg.price;

  const handleInputChange = (field: string, value: string | number) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const generatePDF = (bookingId: string) => {
    const doc = new jsPDF();

    // Header with styling
    doc.setFontSize(24);
    doc.setTextColor(59, 130, 246); // Blue color
    doc.text("WanderLust Travel", 20, 25);

    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("Booking Confirmation", 20, 40);

    // Add a line
    doc.setLineWidth(0.5);
    doc.line(20, 45, 190, 45);

    // Booking Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Booking Details", 20, 60);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Booking ID: ${bookingId}`, 20, 75);
    doc.text(`Package: ${pkg.title}`, 20, 85);
    doc.text(`Destination: ${pkg.location}`, 20, 95);
    doc.text(`Duration: ${pkg.duration}`, 20, 105);

    // Customer Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Customer Information", 20, 125);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Name: ${bookingData.customerName}`, 20, 140);
    doc.text(`Email: ${bookingData.customerEmail}`, 20, 150);
    doc.text(`Phone: ${bookingData.customerPhone}`, 20, 160);

    // Travel Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Travel Details", 20, 180);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Check-in: ${bookingData.checkIn}`, 20, 195);
    doc.text(`Check-out: ${bookingData.checkOut}`, 20, 205);
    doc.text(`Adults: ${bookingData.adults}`, 20, 215);
    doc.text(`Children: ${bookingData.children}`, 20, 225);

    if (bookingData.specialRequests) {
      doc.text(`Special Requests: ${bookingData.specialRequests}`, 20, 235);
    }

    // Price breakdown
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Price Breakdown", 20, 255);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(
      `Adults (${bookingData.adults} × $${pkg.price}): $${(
        bookingData.adults * pkg.price
      ).toFixed(2)}`,
      20,
      270
    );

    if (bookingData.children > 0) {
      doc.text(
        `Children (${bookingData.children} × $${(pkg.price * 0.7).toFixed(
          2
        )}): $${(bookingData.children * pkg.price * 0.7).toFixed(2)}`,
        20,
        280
      );
    }

    // Total
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(59, 130, 246);
    doc.text(`Total Price: $${totalPrice.toFixed(2)}`, 20, 295);

    // Footer
    doc.setTextColor(128, 128, 128);
    doc.setFontSize(10);
    doc.text("Thank you for choosing WanderLust Travel!", 20, 320);
    doc.text(
      "This is a booking inquiry. Final confirmation will be sent after payment.",
      20,
      330
    );

    // Save PDF
    doc.save(`wanderlust-booking-${bookingId}.pdf`);
  };

  const sendEmail = async (bookingId: string) => {
    try {
      const emailjsInstance = initEmailJS();
      if (!emailjsInstance) {
        console.log("EmailJS not initialized");
        return;
      }

      const templateParams = {
        to_email: "sahilniraula00@gmail.com", // Replace with your actual admin email
        customer_name: bookingData.customerName,
        customer_email: bookingData.customerEmail,
        customer_phone: bookingData.customerPhone,
        package_title: pkg.title,
        package_location: pkg.location,
        booking_id: bookingId,
        total_price: totalPrice.toFixed(2),
        check_in: bookingData.checkIn,
        check_out: bookingData.checkOut,
        adults: bookingData.adults,
        children: bookingData.children,
        special_requests: bookingData.specialRequests || "None",
        message: `New booking inquiry received for ${pkg.title}. Customer: ${
          bookingData.customerName
        } (${bookingData.customerEmail}). Total: $${totalPrice.toFixed(2)}`,
      };

      await emailjsInstance.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );

      console.log("Email sent successfully");
    } catch (error) {
      console.error("Email sending failed:", error);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Add booking to local storage
      const booking = addBooking({
        packageId: pkg.id,
        packageTitle: pkg.title,
        customerName: bookingData.customerName,
        customerEmail: bookingData.customerEmail,
        customerPhone: bookingData.customerPhone,
        adults: bookingData.adults,
        children: bookingData.children,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        totalPrice,
        specialRequests: bookingData.specialRequests,
        status: "pending",
      });

      // Send email notification
      await sendEmail(booking.id);

      // Generate and download PDF
      generatePDF(booking.id);

      toast({
        title: "Booking Submitted Successfully!",
        description:
          "Your booking inquiry has been sent. Check your downloads for the booking summary PDF.",
      });

      setStep(3); // Success step
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Booking Failed",
        description:
          "There was an error submitting your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="customerName">Full Name *</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="customerName"
              placeholder="Enter your full name"
              className="pl-10"
              value={bookingData.customerName}
              onChange={(e) =>
                handleInputChange("customerName", e.target.value)
              }
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="customerEmail">Email Address *</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="customerEmail"
              type="email"
              placeholder="Enter your email"
              className="pl-10"
              value={bookingData.customerEmail}
              onChange={(e) =>
                handleInputChange("customerEmail", e.target.value)
              }
              required
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="customerPhone">Phone Number *</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="customerPhone"
            placeholder="Enter your phone number"
            className="pl-10"
            value={bookingData.customerPhone}
            onChange={(e) => handleInputChange("customerPhone", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="checkIn">Check-in Date *</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="checkIn"
              type="date"
              className="pl-10"
              value={bookingData.checkIn}
              onChange={(e) => handleInputChange("checkIn", e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="checkOut">Check-out Date *</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="checkOut"
              type="date"
              className="pl-10"
              value={bookingData.checkOut}
              onChange={(e) => handleInputChange("checkOut", e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="adults">Adults *</Label>
          <div className="relative">
            <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="adults"
              type="number"
              min="1"
              max={pkg.maxPeople}
              className="pl-10"
              value={bookingData.adults}
              onChange={(e) =>
                handleInputChange("adults", Number.parseInt(e.target.value))
              }
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="children">Children</Label>
          <Input
            id="children"
            type="number"
            min="0"
            value={bookingData.children}
            onChange={(e) =>
              handleInputChange("children", Number.parseInt(e.target.value))
            }
          />
        </div>
      </div>

      <div>
        <Label htmlFor="specialRequests">Special Requests</Label>
        <Textarea
          id="specialRequests"
          placeholder="Any special requirements or requests..."
          value={bookingData.specialRequests}
          onChange={(e) => handleInputChange("specialRequests", e.target.value)}
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Package:</span>
            <span className="font-medium">{pkg.title}</span>
          </div>
          <div className="flex justify-between">
            <span>Destination:</span>
            <span className="font-medium">{pkg.location}</span>
          </div>
          <div className="flex justify-between">
            <span>Duration:</span>
            <span className="font-medium">{pkg.duration}</span>
          </div>
          <div className="flex justify-between">
            <span>Check-in:</span>
            <span className="font-medium">{bookingData.checkIn}</span>
          </div>
          <div className="flex justify-between">
            <span>Check-out:</span>
            <span className="font-medium">{bookingData.checkOut}</span>
          </div>
          <div className="flex justify-between">
            <span>Adults:</span>
            <span className="font-medium">{bookingData.adults}</span>
          </div>
          <div className="flex justify-between">
            <span>Children:</span>
            <span className="font-medium">{bookingData.children}</span>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>
                Adults ({bookingData.adults} × ${pkg.price}):
              </span>
              <span>${(bookingData.adults * pkg.price).toFixed(2)}</span>
            </div>
            {bookingData.children > 0 && (
              <div className="flex justify-between">
                <span>
                  Children ({bookingData.children} × $
                  {(pkg.price * 0.7).toFixed(2)}):
                </span>
                <span>
                  ${(bookingData.children * pkg.price * 0.7).toFixed(2)}
                </span>
              </div>
            )}
          </div>

          <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Name:</span>
            <span className="font-medium">{bookingData.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span>Email:</span>
            <span className="font-medium">{bookingData.customerEmail}</span>
          </div>
          <div className="flex justify-between">
            <span>Phone:</span>
            <span className="font-medium">{bookingData.customerPhone}</span>
          </div>
          {bookingData.specialRequests && (
            <div>
              <span className="font-medium">Special Requests:</span>
              <p className="text-sm text-gray-600 mt-1">
                {bookingData.specialRequests}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderStep3 = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <FileText className="h-8 w-8 text-green-600" />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Booking Submitted Successfully!
        </h3>
        <p className="text-gray-600">
          Your booking inquiry has been sent to our team. You'll receive a
          confirmation email shortly. Your booking summary PDF has been
          downloaded automatically.
        </p>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Next Steps:</strong>
          <br />
          1. Check your email for booking confirmation
          <br />
          2. Our team will contact you within 24 hours
          <br />
          3. Complete payment to confirm your booking
        </p>
      </div>
    </div>
  );

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {step === 1 && "Book Your Trip"}
            {step === 2 && "Review & Confirm"}
            {step === 3 && "Booking Confirmed"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div
                    className={`w-12 h-0.5 ${
                      step > stepNum ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

          {/* Action Buttons */}
          <div className="flex justify-between pt-6">
            {step > 1 && step < 3 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}

            {step === 1 && (
              <div className="ml-auto">
                <Button
                  onClick={() => setStep(2)}
                  disabled={
                    !bookingData.customerName ||
                    !bookingData.customerEmail ||
                    !bookingData.customerPhone ||
                    !bookingData.checkIn ||
                    !bookingData.checkOut
                  }
                >
                  Continue
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="ml-auto">
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Booking"}
                </Button>
              </div>
            )}

            {step === 3 && (
              <div className="ml-auto">
                <Button onClick={onClose}>Close</Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
