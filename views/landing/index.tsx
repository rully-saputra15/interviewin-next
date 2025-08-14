import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <main className="fade_in h-screen flex flex-col text-left justify-center items-start">
      <h1 className="font-black text-4xl">Interviewin</h1>
      <p className="font-light text-md">Learn Faster, Think Sharper</p>
      <div className="flex align-center justify-center mt-2">
        <Button variant="default">
          <Link href="/session">
            <span className="line-through">IDR 10rb/month</span> Free for You
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default LandingPage;
