import React from "react";
import hero from "../../assets/hero.png";
import logo from "../../assets/logo.png";
import { FaMapMarkedAlt, FaCompass } from "react-icons/fa";

function Hero() {
  return (
    <section
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${hero})` }}
    >
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-screen">
        <div className="max-w-4xl">

          {/* Main Heading */}
          <h1 className="text-white font-bold leading-tight text-3xl md:text-6xl">
            Discover Nepal,
            <br />
            <span className="text-amber-400">
              One Step
            </span>{" "}
            at a Time
          </h1>

          {/* Description */}
          <p className="mt-16 text-base md:text-2xl text-gray-200 max-w-3xl leading-relaxed">
            BatoSanjaal is your smart travel companion for Nepal.
            Find nearby hotels, heritage sites, hiking trails,
            and hidden gems all within your reach.
            Let us guide your next adventure.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">

            <button
              className="
                flex items-center justify-center gap-3
                bg-teal-600 text-white
                px-4 py-3
                rounded-xl
                text-lg
                hover:bg-teal-700
                transition duration-300
              "
            >
              <FaMapMarkedAlt />
              Discover Nearby Sites
            </button>

            <button
              className="
                flex items-center justify-center gap-3
                px-8 py-4
                border border-white/40
                text-white
                rounded-xl
                text-lg
                hover:bg-white/10
                backdrop-blur-sm
                transition duration-300
              "
            >
              <FaCompass />
              Explore Destinations
            </button>

          </div>
        </div>
      </div>

      {/* Bottom Fade Effect */}
      <div className="absolute bottom-0 left-0 w-full h-50 bg-gradient-to-t from-white via-white/60 to-transparent pointer-events-none z-20"></div>
    </section>
  );
}

export default Hero;