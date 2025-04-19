import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Credits = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] px-6 py-10 text-center bg-gradient-to-br from-purple-50 via-white to-purple-100 rounded-xl shadow-inner">
      {/* <Image
        src="/assets/icons/coin.svg"
        alt="Credits Icon"
        width={64}
        height={64}
        className="mb-6"
      /> */}

      <h1 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-4">
        Credits Purchase Coming Soon 💳
      </h1>

      <p className="max-w-md text-base sm:text-lg text-purple-700 mb-6">
        We're working on something awesome to let you purchase and manage your
        credits easily. Stay tuned for updates!
      </p>

      <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-base font-medium transition duration-200">
        Notify Me
      </Button>
    </section>
  );
};

export default Credits;
