"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LandingPage } from "../components/LandingPage";

export default function HomePage() {
  const router = useRouter();

  const handleOpenBuilder = () => {
    router.push("/builder");
  };

  return <LandingPage onStartBuilder={handleOpenBuilder} />;
}
