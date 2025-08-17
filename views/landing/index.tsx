"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import useLandingPage from "./useLandingPage";

const LandingPage = () => {
  const { containerRef } = useLandingPage();
  return (
    <main ref={containerRef}>
      <h1 className="font-black text-4xl text">Interviewin</h1>
      <p className="font-light text-md text">Learn Faster, Think Sharper</p>
      <div className="flex align-center justify-center mt-2 cta-button">
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
