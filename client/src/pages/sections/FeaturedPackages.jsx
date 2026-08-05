import React from "react";
import { FaClock, FaInfoCircle } from "react-icons/fa";
import pic1 from "../../assets/pic1.jpeg";

const packages = [
  {
    id: 1,
    title: "Himalayan Trekking Bundle",
    company: "ABC Trail Nepal",
    description:
      "A full package of backpack, trekking pole, water bottle, jacket, thermals, uv protection glasses, etc.",
    price: "NPR 25,000",
    image:pic1,
  },
  {
    id: 2,
    title: "Chitwan Jungle Safari Escapade",
    company: "Wild Sauraha Adventures",
    description:
      "2 Nights / 3 Days package including 4WD jeep safari, dugout canoe ride along Rapti river, Tharu cultural dance, resort stay, and all meals.",
    price: "NPR 15,000",
    image:"https://www.chitwanjungleguides.com/wp-content/uploads/2019/01/chitwan-jungle-jeep-safariwww.chitwanjungleguides.com_.png",
  },
  {
    id: 3,
    title: "Powerful Pokhara Combo",
    company: "Lakeside Gateway Tours",
    description:
      "Includes tandem paragliding from Sarangkot, boating at Phewa Lake, visits to Bat Cave (Chameri Gufa), Davis Falls, Pame hangout, plus 2 nights hotel accommodation.",
    price: "NPR 18,500",
    image:"https://lp-cms-production.imgix.net/2019-06/53693064.jpg?fit=crop&q=40&sharp=10&vib=20&auto=format&ixlib=react-8.6.4",
  },
  {
    id: 4,
    title: "Everest Base Camp Express Trek",
    company: "Khumbu Trail Expeditions",
    description:
      "12-day fully guided trek to EBC and Kala Patthar. Includes round-trip Kathmandu-Lukla flights, teahouse accommodation, mountain permits, guide, and porter services.",
    price: "NPR 150,000",
    image:"https://nypost.com/wp-content/uploads/sites/2/2020/04/everest-base-camp.jpg?quality=90&strip=all",
  },
  {
    id: 5,
    title: "Upper Mustang Overland Tour",
    company: "Kingdom Overland Nepal",
    description:
      "5 Nights / 6 Days 4WD Scorpio overland journey from Pokhara to Muktinath temple, Marpha, and ancient sky caves.",
    price: "NPR 19,000",
    image:
      "https://insidehimalayas.com/wp-content/uploads/2019/07/Range-Above-Panda-Khola-Lubra-Mustang-Nepal.jpg",
  },
  {
    id: 6,
    title: "Kathmandu Valley All-UNESCO Heritage Pass",
    company: "Yeti Heritage Trails",
    description:
      "2-day guided cultural city tour covering all 7 UNESCO sites: Swayambhunath, Boudhanath, Pashupatinath, Changu Narayan, and the Durbar Squares of Kathmandu, Patan, & Bhaktapur.",
    price: "NPR 8,500",
    image:
      "https://visitsnepal.com/wp-content/uploads/2020/09/kathmandu-things-to-do-1024x661.jpg",
  },
];

const FeaturedPackages = () => {
  return (
    <section className="py-16 bg-[#faf8fe]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="uppercase tracking-widest text-teal-700 font-medium">
            Curated For You
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2">
            Featured Packages
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Handpicked travel packages from top companies and hotels across
            Nepal.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-8">
          {packages.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />

                <span className="absolute top-4 right-4 bg-yellow-400 text-black text-sm font-semibold px-4 py-1 rounded-full">
                  {item.price}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="text-teal-700 font-medium mt-1">
                  {item.company}
                </p>

                <p className="text-gray-600 mt-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Bottom */}
                {/* <div className="flex items-center justify-between mt-6">
                  <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full hover:bg-teal-600 hover:text-white transition">
                    <FaInfoCircle />
                    Details
                  </button>
                </div> */}

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;