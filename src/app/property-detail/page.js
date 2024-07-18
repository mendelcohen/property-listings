"use client";
import Image from "next/image";

import { useEffect, useState } from "react";
export default function PropertyDetail() {
  const [property, setProperty] = useState({});
  const { line, city, state_code, postal_code } = property?.location
    ? property?.location?.address
    : "";

  useEffect(() => {
    const listing = localStorage.getItem("listing");
    setProperty(JSON.parse(listing));
  }, []);

  return (
    <div className="p-6">
      <h1 className="my-[24px] mx-auto">
        Property Details: {line}, {city}, {state_code} {postal_code}
      </h1>
      <Image
        src="/construction.jpg"
        alt=""
        className="w-full"
        width={900}
        height={600}
      />
    </div>
  );
}
