import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaLandmark,
  FaMountain,
  FaTree,
  FaWater,
  FaUtensils,
} from "react-icons/fa";
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
    icon: <FaMapMarkerAlt className="text-blue-500" />,
  },
  {
    label: "Temple",
    color: "bg-green-500",
    icon: <FaLandmark className="text-green-500" />,
  },
  {
    label: "Lake",
    color: "bg-cyan-500",
    icon: <FaWater className="text-cyan-500" />,
  },
  {
    label: "Hiking",
    color: "bg-orange-500",
    icon: <FaMountain className="text-orange-500" />,
  },
  {
    label: "Park",
    color: "bg-emerald-500",
    icon: <FaTree className="text-emerald-500" />,
  },
  {
    label: "Restaurant",
    color: "bg-red-500",
    icon: <FaUtensils className="text-red-500" />,
  },
];


const NearbyMap = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [center, setCenter] = useState(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (!navigator.geolocation){
      alert("Geolocation is not supported by your browser:(");
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
        alert ("Unable to get your Location :(");

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
      let types = [];

      switch (selectedCategory){
        case "All":
          types = [
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
          break;
          
      case "Religious Sites":
        types = [
          "hindu_temple",
          "church",
          "mosque",
          "buddhist_temple",
        ];
        break;

      case "Lake":
        types = ["lake"];
        break;

      case "Hiking":
        types = ["hiking_area"];
        break;

      case "Park":
        types = ["park"];
        break;

      case "Restaurant":
        types = ["restaurant"];
        break;

      case "Hospital":
        types = ["hospital"];
        break;

      case "ATM":
        types = ["atm"];
        break;

      case "Police Station":
        types = ["police"];
        break;

      default:
        types = [];
    }

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
            "places.displayName,places.location",
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

      if (!response.ok) {
        console.error(type, data);
        continue;
      }

      if (data.places){
        allPlaces.push(...data.places);
      }
    }

    const uniquePlaces = Array.from(
      new Map(allPlaces.map((place) => [place.displayName.text, place])).values()
    );

    setPlaces(uniquePlaces);

      } catch (error){
        console.error ("Error Fetching nearby Places:", error);
      }
  };
 
  useEffect(() => {
  fetchNearbyPlaces();
}, [center, selectedCategory]);
  
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
                <Marker position = {center} 
                   icon={{
                     url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                   }}
                />
                {
                  places.map((place) => (
                    <Marker 
                    key = {place.displayName.text}
                    position = {{
                      lat: place.location.latitude,
                      lng: place.location.longitude,
                    }}
                    />
                  ))
                }
                
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
            Showing <span className="font-semibold">{places.length}</span> nearby places
          </p>
        </div>
      </div>
    </section>
  );
};

export default NearbyMap;