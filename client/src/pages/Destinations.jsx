import React, { useState } from "react";
import {
  FaSearch,
  FaHeart,
  FaRegHeart,
  FaMapMarkerAlt,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";

const initialDestinations = [
  {
    id: 1,
    name: "Mero ghar",
    city: "Lalitpur",
    category: "Heritage Site",
    rating: 4.0,
    description: "Beautiful heritage place with traditional architecture.",
    price: "0",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900",
    favorite: true,
  },
  
];

// const [destinationsData, setDestinationsData] = useState([]);

// useEffect(() => {
//   axios
//     .get("")
//     .then((res) => setDestinationsData(res.data))
//     .catch((err) => console.log(err));
// }, []);

const cities = [
  "All",
  "Kathmandu",
  "Bhaktapur",
  "Pokhara",
  "Lalitpur",
  "Chitwan",
  "Lumbini",
];

const categories = [
  "All Categories",
  "Heritage Site",
  "Restaurant",

];

function Destinations() {
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedCategory, setSelectedCategory] =
    useState("All Categories");
  const [destinationsData, setDestinationsData] =
    useState(initialDestinations);

  const filteredDestinations = destinationsData.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase());

    const matchCity =
      selectedCity === "All" || item.city === selectedCity;

    const matchCategory =
      selectedCategory === "All Categories" ||
      item.category === selectedCategory;

    return matchSearch && matchCity && matchCategory;
  });
  
  const toggleFavorite = (id) => {
  setDestinationsData((prev) =>
    prev.map((place) =>
      place.id === id
        ? { ...place, favorite: !place.favorite }
        : place
    )
  );
};

  return (
    <section className="bg-[#faf9f7] py-6 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">

        <h1 className="flex items-center gap-3 text-4xl font-bold">
          Explore Destinations
        </h1>

        <p className="text-gray-600 mt-2">
          Discover the beauty of Nepal by city and category
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-9">

          <div className="relative lg:col-span-8">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search destinations..."
              className="w-full border rounded-xl py-1 pl-14 pr-4 border-gray-200 shadow outline-none focus:ring-1 focus:ring-teal-700"
            />
          </div>

          <div className="lg:col-span-2">
            <select className="w-full border rounded-xl py-1 px-4 border-gray-200 shadow bg-white cursor-pointer ">
              <option>All</option>
              <option>Kathmandu</option>
              <option>Pokhara</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <select className="w-full border rounded-xl py-1 px-4 border-gray-200 shadow bg-white cursor-pointer">
              <option>All Categories</option>
              <option>Heritage Site</option>
              <option>Restaurant</option>
            </select>
          </div>

        </div>


        <div className="flex gap-3 overflow-x-auto py-8">

          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-1 rounded-xl whitespace-nowrap border-gray-200 shadow transition

              ${
                selectedCity === city
                  ? "bg-teal-700 text-white"
                  : "bg-white border hover:bg-gray-100"
              }`}
            >
              {city}
            </button>
          ))}

        </div>


{/* Cards */}

{filteredDestinations.length > 0 ? (

  <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-3">

    {filteredDestinations.map((place) => (

      <div
        key={place.id}
        className="bg-white rounded-2xl shadow-sm overflow-hidden border-gray-200 shadow"
      >

        <div className="relative">

          <img
            src={place.image}
            alt={place.name}
            className="overflow:hidden w-full h-64 object-cover transition-transform duration-700 hover:scale-110"
          />

          <span
            className="absolute top-4 left-4 bg-teal-700 text-white px-3 py-1 rounded-full text-sm font-semibold"
          >
            {place.category}
          </span>

          <button
            onClick={() => toggleFavorite(place.id)}
            className={`absolute top-4 right-4 w-12 h-12 rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300
              ${
                place.favorite
                  ? "bg-red-500"
                  : "bg-white"
              }
            `}
          >
            {place.favorite ? (
              <FaHeart className="text-white text-xl" />
            ) : (
              <FaRegHeart className="text-gray-700 text-xl" />
            )}
          </button>

        </div>

        <div className="p-5">

          <h2 className="text-2xl font-bold text-gray-900">
            {place.name}
          </h2>

          <div className="flex items-center gap-2 text-gray-500 mt-2">
            <FaMapMarkerAlt className="text-teal-700" />
            <span>{place.city}</span>
          </div>

          <p className="text-gray-600 mt-4 leading-relaxed">
            {place.description}
          </p>


          <div className="flex items-center justify-between mt-5">

            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              <span className="font-semibold">
                {place.rating}
              </span>
            </div>

            <span className="font-semibold text-gray-700">
              {place.price}
            </span>

          </div>

          <button
            className="w-full mt-6 border border-gray-300 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-teal-700 hover:text-white transition"
          >
            View Details
            <FaArrowRight />
          </button>

        </div>

      </div>

    ))}

  </div>

) : (

  <div className="flex flex-col items-center justify-center py-24">

    {/* Icon */}

    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-16 h-16 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M7 12h10M10 18h4"
      />
    </svg>

    <h2 className="text-3xl font-semibold text-gray-600 mt-6">
      No destinations found
    </h2>

    <p className="text-gray-500 mt-2">
      Try adjusting your filters
    </p>

  </div>

)}

      </div>

    </section>

  );
}

export default Destinations;