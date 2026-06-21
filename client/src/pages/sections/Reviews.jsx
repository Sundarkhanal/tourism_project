import React, { useEffect, useState } from "react";
import { FaQuoteLeft, FaStar, FaRegStar } from "react-icons/fa";

const ReviewsStories = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // fetch

    // dummy data
    setReviews([
      {
        _id: 1,
        name: "Marco Rossi",
        location: "Pokhara",
        review:
          "Used the chatbot to plan my entire 10-day itinerary. It suggested Bandipur which wasn't even on my radar - turned out to be the highlight of my trip!",
        rating: 5,
      },
      {
        _id: 2,
        name: "James Wilson",
        location: "Everest Region",
        review:
          "Great app for first-time visitors to Nepal. The emergency contacts section gave me peace of mind during my solo trekking adventure.",
        rating: 4,
      },
      {
        _id: 3,
        name: "Sarah Chen",
        location: "Kathmandu",
        review:
          "Firantey made my Nepal trip so much easier! Found amazing hidden temples near my hotel that I would never have discovered otherwise.",
        rating: 5,
      },
    ]);
  }, []);

  return (
    <section className="bg-[#f8f6f3] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="uppercase tracking-widest text-teal-700 font-medium">
            What Travelers Say
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">
            Reviews & Stories
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-5">
          {reviews.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* Quote */}
              <FaQuoteLeft className="text-3xl text-gray-100 mb-4" />

              {/* Review */}
              <p className="text-gray-700 leading-8 min-h-[145px]">
                {item.review}
              </p>

              {/* Bottom */}
              <div className="mt-0 flex items-end justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-[#1b8a78] font-semibold">
                    {item.name.charAt(0)}
                  </div>

                  {/* Name */}
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">
                      {item.name}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {item.location}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) =>
                    star <= item.rating ? (
                      <FaStar
                        key={star}
                        className="text-yellow-400 text-sm"
                      />
                    ) : (
                      <FaRegStar
                        key={star}
                        className="text-gray-300 text-sm"
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsStories;