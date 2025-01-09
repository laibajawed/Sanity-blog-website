import Link from "next/link";
import React from "react";
import { Youtube } from "./icons";

export default function FooterLearn() {
  return (
    <section className="bg-accentDarkPrimary px-6 sm:px-8 md:px-12 py-6 flex flex-col items-center justify-between gap-y-4  w-full md:w-1/2 ">
      <h4 className="text-2xl xs:text-4xl sm:text-4xl lg:text-5xl font-semibold text-light uppercase ">
        <span className="text-dark font-bold">Check out our blogs every day for content related to cars.</span>
      </h4>
   
    </section>
  );
}
