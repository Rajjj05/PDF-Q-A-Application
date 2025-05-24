import React, { useState } from "react";
import ChatHeader from "@/components/ChatHeader";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { ApiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { saveAs } from "file-saver";

interface Message {
  id: number;
  type: "user" | "bot";
  message: string;
  timestamp: Date;
}

const HomePage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [documentsUploaded, setDocumentsUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const [pdfName, setPdfName] = useState<string | null>(null);

  const handleSendMessage = async (message: string) => {
    if (!documentsUploaded) {
      toast({
        title: "No documents uploaded",
        description: "Please upload PDF documents before asking questions.",
        variant: "destructive",
      });
      return;
    }
    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    try {
      const response = await ApiService.queryDocuments(message);
      const botMessage: Message = {
        id: Date.now() + 1,
        type: "bot",
        message: response.response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Query failed:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        type: "bot",
        message:
          "Sorry, I encountered an error while processing your question. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      toast({
        title: "Query failed",
        description:
          error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadSuccess = (fileName: string, summary: string) => {
    setUploading(false);
    setDocumentsUploaded(!!fileName);
    setPdfName(fileName || null);
    if (!fileName && summary) {
      // Show error in chat and toast if PDF can't be read
      setMessages([
        {
          id: Date.now(),
          type: "bot",
          message: summary,
          timestamp: new Date(),
        },
      ]);
      toast({
        title: "PDF Upload Error",
        description: summary,
        variant: "destructive",
      });
    } else {
      setMessages(
        fileName
          ? [
              {
                id: Date.now(),
                type: "bot",
                message: summary,
                timestamp: new Date(),
              },
            ]
          : []
      );
    }
  };

  const handleUploadStart = () => {
    setDocumentsUploaded(false);
    setMessages([]);
    setPdfName(null);
    setUploading(true);
  };

  const handleDownloadChat = () => {
    if (messages.length === 0) return;
    const chatText = messages
      .map((msg) => {
        const who = msg.type === "user" ? "You" : "AI";
        return `${who}: ${msg.message}`;
      })
      .join("\n\n");
    const blob = new Blob([chatText], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `chat-history-${new Date().toISOString().slice(0, 10)}.txt`);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ChatHeader
        onUploadSuccess={(fileName: string, summary: string) => {
          setUploading(false);
          handleUploadSuccess(fileName, summary);
        }}
        onUploadStart={handleUploadStart}
        uploading={uploading}
      />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleDownloadChat}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-sm font-medium border border-gray-300 transition-all disabled:opacity-50"
              disabled={messages.length === 0}
            >
              Download Chat History
            </button>
          </div>
          {messages.map((msg) => (
            <ChatMessage key={msg.id} type={msg.type} message={msg.message} />
          ))}
          {isLoading && (
            <div className="flex items-start space-x-3 mb-6">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">ei</span>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={isLoading || !documentsUploaded}
        placeholder={
          documentsUploaded
            ? "Ask a question about your document..."
            : "Upload a PDF to start chatting"
        }
      />
    </div>
  );
};

export default HomePage;
