import { useRef, useState } from "react";
import {
  FaArrowUp,
  FaMicrophone,
  FaVolumeHigh,
} from "react-icons/fa6";
import chatbotService from "../services/chatbot.service";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [recording, setRecording] = useState(false);
  const [transcribing, setTranscribing] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error("Microphone error:", error);
    }
  };

  const stopRecording = () => {
    const mediaRecorder = mediaRecorderRef.current;

    if (!mediaRecorder || mediaRecorder.state === "inactive") return;

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: mediaRecorder.mimeType || "audio/webm",
      });

      mediaRecorder.stream
        .getTracks()
        .forEach((track) => track.stop());

      if (audioBlob.size === 0) return;

      const formData = new FormData();
      formData.append("file", audioBlob, "recording.webm");

      setTranscribing(true);

      try {
        const response = await chatbotService.post(
          "/api/transcribe",
          formData
        );

        if (response.data?.text) {
          setMessage(response.data.text);
        }
      } catch (error) {
        console.error("Transcription error:", error);
        alert("Failed to transcribe audio. Please try again.");
      } finally {
        setTranscribing(false);
      }
    };

    mediaRecorder.stop();
    setRecording(false);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) return;
    const userMessage ={
      id: `${Date.now()}-user`,
      sender: "user",
      text:trimmedMessage,
    }

    setMessages((previousMessages)=>[
      ...previousMessages,
      userMessage,
    ]);

    setMessage("");
    setLoading(true);

    try{
      const response = await chatbotService.post("/api/chatbot/message",
        {
          message:trimmedMessage,
        }
      );

      const botMessage = {
        id: `${Date.now()}-bot`,
        sender: "bot",
        text: response.data.response,
      }
      setMessages((previousMessages) => [
        ...previousMessages,
        botMessage,
      ]);
    }catch(error){
      console.error("Chatbot error:", error);
      const errorMessage = {
        id: `${Date.now()}-error`,
        sender: "bot",
        text: "Sorry, Bato AI is unavailable right now. Please try again.",
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        errorMessage,
      ]);

    } finally {
      setLoading(false);
    }
  };

  const readAloud = (text) => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const speech = new SpeechSynthesisUtterance(text);
    speech.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(speech);
    setSpeaking(true);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] px-4 py-10">
      <div className="mx-auto flex min-h-[80vh] max-w-4xl flex-col">
        <div className="flex flex-1 flex-col items-center justify-center">
          {messages.length === 0 && (
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-semibold text-gray-900">
                Meet Bato AI
              </h1>

              <p className="mt-3 text-gray-500">
                Ask detailed questions for better travel responses
              </p>
            </div>
          )}

          {messages.length > 0 && (
            <div className="mb-6 flex w-full flex-1 flex-col gap-4 overflow-y-auto">
              {messages.map((chatMessage) => (
                <div
                  key={chatMessage.id}
                  className={`max-w-[80%] ${chatMessage.sender === "user" ? "ml-auto" : "mr-auto"
                  }`}
                >
                  <div className={`rounded-3xl px-5 py-3 ${
                    chatMessage.sender === "user" ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-900"
                    }`}
                  >
                    {chatMessage.text}
                  </div>

                  {chatMessage.sender === "bot" && (
                    <button type="button" 
                      onClick={() => readAloud(chatMessage.text)}
                      className="mt-1 flex items-center gap-2 rounded-full px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
                    >
                      <FaVolumeHigh />
                      {speaking ? "Stop" : "Read Aloud"}
                    </button>
                  )}

                </div>
              ))}
              {loading && (
              <div className="mr-auto max-w-[80%]">
                <div className="rounded-3xl bg-gray-200 px-5 py-3 text-gray-500">
                  Thinking...
                </div>
              </div>
            )}
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-3xl items-center gap-3 rounded-[30px] border border-gray-300 bg-white px-5 py-3 shadow-lg"
        >
          <input
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={transcribing ? "Transcribing voice..." : recording ? 
              "Listening... Click again to stop" : "Ask Bato AI anything"}
            disabled={recording || transcribing}
            className="min-w-0 flex-1 bg-transparent outline-none"
          />

          <button
            type="button"
            onClick={recording ? stopRecording : startRecording}
            disabled={transcribing || loading}
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                recording
                  ? "bg-red-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              aria-label={recording ? "Stop recording" : "Start recording"}  
            >
            <FaMicrophone />
          </button>

          <button
            type="submit"
            disabled={!message.trim() || loading || recording || transcribing }
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white disabled:bg-gray-300"
          >
            <FaArrowUp />
          </button>
        </form>

        <p className="mt-3 text-center text-xs text-gray-400">
          Bato AI can make mistakes. Check important travel information.
        </p>
      </div>
    </div>
  );
}

export default Chatbot;