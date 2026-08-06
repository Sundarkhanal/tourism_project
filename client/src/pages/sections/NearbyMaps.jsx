import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaLandmark,
  FaMountain,
  FaTree,
  FaWater,
  FaUtensils,
} from "react-icons/fa";
import { toast } from "sonner";
import { Map as GoogleMap, Marker } from "@vis.gl/react-google-maps";

const categories = [
  "All",
  "Religious Sites",
  "Lake",
  "Hiking",
  "Park",
  "Restaurant",
  "Hospital",
  "ATM",
  "Police Station",  
];

const legendItems = [
  {
    label: "Your Location",
    color: "bg-blue-500",
  },
  {
    label: "Religious Sites",
    color: "bg-green-500",
  },
  {
    label: "Lake",
    color: "bg-cyan-500",
  },
  {
    label: "Hiking",
    color: "bg-orange-500",
  },
  {
    label: "Park",
    color: "bg-emerald-500",
  },
  {
    label: "Restaurant",
    color: "bg-red-500",
  },
  {
    label: "Hospital",
    color: "bg-pink-500",
  },
  {
    label: "ATM",
    color: "bg-yellow-500",
  },
  {
    label: "Police Station",
    color: "bg-indigo-500",
  },
];

const markerIcons = {
  hindu_temple: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  church: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  mosque: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  buddhist_temple: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",

  lake: "https://maps.google.com/mapfiles/ms/icons/ltblue-dot.png",

  hiking_area: "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",

  park: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",

  restaurant: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",

  hospital: "https://maps.google.com/mapfiles/ms/icons/pink-dot.png",

  atm: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",

  police: "https://maps.google.com/mapfiles/ms/icons/purple-dot.png",
};


const NearbyMap = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [center, setCenter] = useState(null);
  const [allPlaces, setAllPlaces] = useState([]);

  const categoryMap = {
    "Religious Sites": [
      "hindu_temple",
      "church",
      "mosque",
      "buddhist_temple",
    ],
    "Lake": ["lake"],
    "Hiking": ["hiking_area"],
    "Park": ["park"],
    "Restaurant": ["restaurant"],
    "Hospital": ["hospital"],
    "ATM": ["atm"],
    "Police Station": ["police"],
  };

  useEffect(() => {
    if (!navigator.geolocation){
      toast.error("Geolocation is not supported by your browser:(");
      return;
    }

  navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
       },
       (error) => {
        console.error (error);
        toast.error ("Unable to get your Location :(");

       },
       {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
       }
    );
  }, []);

  const fetchNearbyPlaces = async () => {
    if (!center) return;

    try{
      const types = [
          "hindu_temple",
          "church",
          "mosque",
          "buddhist_temple",
          "lake",
          "hiking_area",
          "park",
          "restaurant",
          "hospital",
          "atm",
          "police",
      ];


    let allPlaces = [];
    for (const type of types){
      const response = await fetch(
        "https://places.googleapis.com/v1/places:searchNearby",
        {
          method: "POST",
          headers:{
            "Content-Type":"application/json",
            "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
            "X-Goog-FieldMask":
            "places.displayName,places.location,places.types",
          },
          body: JSON.stringify({
            includedTypes: [type],
            maxResultCount: 20,
            locationRestriction: {
              circle:{
                center:{
                  latitude:center.lat,
                  longitude: center.lng,
                },
                radius: 5000,
              },

            },
          }),
        },
      );

      const data = await response.json();
      console.log(data.places);

      if (!response.ok) {
        console.error(type, data);
        continue;
      }

      if (data.places){
        allPlaces.push(...data.places);
      }
    }

    const uniquePlaces = Array.from(
      new Map(
        allPlaces.map((place) => [
          `${place.displayName.text}-${place.location.latitude}-${place.location.longitude}`,
          place,
        ])
      ).values()
    );

    setAllPlaces(uniquePlaces);

      } catch (error){
        console.error ("Error Fetching nearby Places:", error);
      }
    };
 
  useEffect(() => {
    if (center){
  fetchNearbyPlaces();
    }
}, [center]);


const businessTypes = [
  "travel_agency",
  "tourist_information_center",
  "lodging",
  "store",
  "sports_activity_location"
];

const filteredPlaces =
  selectedCategory === "All"
    ? allPlaces
    : allPlaces.filter((place) => {
        const matchesCategory = place.types?.some((type) =>
          categoryMap[selectedCategory]?.includes(type)
        );

        if (!matchesCategory) return false;

        if (selectedCategory === "Hiking" || "Lake") {
          return !place.types?.some((type) =>
            businessTypes.includes(type)
          );
        }

        return true;
      });

      const getMarkerIcon = (types = []) => {
            for (const type of types) {
              if (markerIcons[type]) {
                return markerIcons[type];
              }
            }
          
        return "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
      };
  
  return (
    <section className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-4xl mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Nearby Sites
          </h1>

          <p className="mt-2 text-gray-600 max-w-2xl">
            Tourism sites, police stations, hospitals & ATMs within 5km
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${
                  selectedCategory === category
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-emerald-50 hover:border-emerald-400"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Horizontal Legend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-5 py-4 mb-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {legendItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <span
                  className={`w-3 h-3 rounded-full ${item.color}`}
                ></span>

                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Map Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="w-full h-[650px]">
           {center ? (
             <GoogleMap
               defaultCenter={center}
               defaultZoom={15}
               gestureHandling="greedy"
               disableDefaultUI={false}
               style={{ width: "100%", height: "100%" }}
               >
                <Marker
                  position={center}
                  icon={{
                    url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                  }}
                />
                
                {filteredPlaces.map((place) => (
                  <Marker
                    key={`${place.displayName.text}-${place.location.latitude}-${place.location.longitude}`}
                    position={{
                      lat: place.location.latitude,
                      lng: place.location.longitude,
                    }}
                    icon={{
                      url: getMarkerIcon(place.types),
                    }}
                  />
                ))}
                
             </GoogleMap>
           ) : (
             <div className="w-full h-full flex items-center justify-center">
               Getting your location...
             </div>
           )}
         </div>
         </div>

        {/* Footer Info */}
        <div className="mt-5 flex flex-wrap justify-between items-center text-sm text-gray-600">
          <p>
            Showing <span className="font-semibold">{filteredPlaces.length}</span> nearby places
          </p>
        </div>
      </div>
    </section>
  );
};

export default NearbyMap;