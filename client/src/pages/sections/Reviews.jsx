import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaQuoteLeft,
  FaStar,
  FaRegStar,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

const ReviewsStories = () => {
  const [reviews, setReviews] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reviews");
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const totalSlides = Math.max(1, Math.ceil(reviews.length / 2));

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === totalSlides - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? totalSlides - 1 : prev - 1
    );
  };

  return (
    <section className="bg-color-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="uppercase tracking-widest text-teal-700 font-medium">
            What Travelers Say
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">
            Reviews & Stories
          </h2>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No reviews yet.
          </div>
        ) : (
          <>
            {/* Slider */}
            <div className="relative overflow-hidden">
              {/* Left Button */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-100 hover:bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center"
              >
                <FaArrowLeft />
              </button>

              {/* Cards */}
              <div
                className="flex transition-transform duration-500"
                style={{
                  transform: `translateX(-${current * 100}%)`,
                }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="min-w-full grid grid-cols-1 md:grid-cols-2 gap-6 px-14"
                  >
                    {reviews
                      .slice(slideIndex * 2, slideIndex * 2 + 2)
                      .map((item) => (
                        <div
                          key={item._id}
                          className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                        >
                          <FaQuoteLeft className="text-3xl text-gray-200 mb-4" />

                          <p className="text-gray-700 leading-relaxed flex-1 text-sm">
                            "{item.review}"
                          </p>

                          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-semibold text-base">
                                {item.name?.charAt(0)}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 text-base">
                                  {item.name}
                                </h4>
                                <p className="text-gray-500 text-xs">
                                  {item.location}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) =>
                                star <= item.rating ? (
                                  <FaStar key={star} className="text-yellow-400 text-sm" />
                                ) : (
                                  <FaRegStar key={star} className="text-gray-300 text-sm" />
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>

              {/* Right Button */}
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-100 hover:bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center"
              >
                <FaArrowRight />
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-10">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    current === index
                      ? "w-8 bg-teal-600"
                      : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ReviewsStories;