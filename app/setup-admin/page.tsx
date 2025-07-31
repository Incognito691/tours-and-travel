"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Shield, CheckCircle } from "lucide-react";

export default function SetupAdminPage() {
  const { user } = useUser();
  const { toast } = useToast();

  const makeAdmin = async () => {
    if (!user) return;

    try {
      const response = await fetch("/api/make-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to update admin status");
      }

      toast({
        title: "Success!",
        description:
          "You are now an admin. Please refresh the page to see admin features.",
      });

      // Refresh the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update admin status. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600">
              Please sign in first to access admin setup
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isAlreadyAdmin = user.publicMetadata?.role === "admin";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {isAlreadyAdmin ? (
              <CheckCircle className="h-8 w-8 text-green-600" />
            ) : (
              <Shield className="h-8 w-8 text-blue-600" />
            )}
          </div>
          <CardTitle>
            {isAlreadyAdmin ? "Admin Access Confirmed" : "Setup Admin Access"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-gray-600">
              {isAlreadyAdmin
                ? "You already have admin privileges!"
                : "Click the button below to give yourself admin privileges for the WanderLust travel website."}
            </p>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Current user:</strong>{" "}
                {user.emailAddresses[0]?.emailAddress}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Current role:</strong>{" "}
                {String(user.publicMetadata?.role || "user")}
              </p>
            </div>
          </div>

          {isAlreadyAdmin ? (
            <div className="space-y-3">
              <Button className="w-full" asChild>
                <a href="/admin">Go to Admin Dashboard</a>
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                asChild
              >
                <a href="/">Back to Home</a>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Button onClick={makeAdmin} className="w-full">
                <Shield className="h-4 w-4 mr-2" />
                Make Me Admin
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                asChild
              >
                <a href="/">Back to Home</a>
              </Button>
            </div>
          )}

          <div className="text-xs text-gray-500 text-center">
            <p>⚠️ Only use this if you are the website owner</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
