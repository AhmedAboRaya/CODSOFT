"use client";

import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { CheckCircle } from "lucide-react";

export default function DoneSection() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <CheckCircle className="w-16 h-16 text-green-500" />
      <h2 className="text-2xl font-bold">Thank You for Your Order!</h2>
      <p className="text-center text-gray-600">
        Your order has been successfully placed. We&apos;ll send you a
        confirmation email shortly.
      </p>
      <Link to={"/shop"}>
        <Button>Continue Shopping</Button>
      </Link>
    </div>
  );
}
