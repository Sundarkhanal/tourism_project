function Chatbot() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-teal-600 text-white text-center py-6">
          <h1 className="text-3xl font-bold">🤖 Bato AI Assistant</h1>
          <p className="text-teal-100 mt-1">
            Your smart travel companion for Nepal
          </p>
        </div>

        {/* Chat Area */}
        <div className="h-[450px] flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700">
              Start a Conversation
            </h2>
            <p className="text-gray-500 mt-2">
              Ask about destinations, hotels, trekking routes,
              or travel tips in Nepal.
            </p>
          </div>
        </div>

        {/* Input */}
        <div className="border-t bg-white p-5 flex gap-3">
          <input
            type="text"
            placeholder="Ask Bato AI anything..."
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 rounded-xl transition">
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

export default Chatbot;