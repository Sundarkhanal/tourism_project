function NearbyMap() {
  return (
    <section className="min-h-screen bg-gray-50 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Nearby Sites
          </h1>

          <p className="mt-2 text-lg text-gray-600">
            Discover attractions around your current location.
          </p>
        </div>

        {/* Map Placeholder */}
        <div className="h-[600px] w-full rounded-2xl border-2 border-dashed border-gray-300 bg-white shadow-lg flex items-center justify-center">
          <p className="text-xl text-gray-500">
            🗺️ Galli Map will be displayed here.
          </p>
        </div>

      </div>
    </section>
  );
}

export default NearbyMap;