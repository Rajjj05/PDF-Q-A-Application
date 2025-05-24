import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface ChatHeaderProps {
  onUploadSuccess: (fileName: string, summary: string) => void;
  onUploadStart: () => void;
  uploading: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  onUploadSuccess,
  onUploadStart,
  uploading,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [pdfName, setPdfName] = useState<string | null>(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfName(file.name);
      onUploadStart();
      const formData = new FormData();
      formData.append("files", file);
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/upload`, {
          method: "POST",
          body: formData,
        });
        if (!response.ok) throw new Error("Upload failed");
        const data = await response.json();
        if (data.status === "error" || data.status === "partial") {
          setPdfName(null);
          onUploadSuccess("", data.message);
        } else {
          onUploadSuccess(file.name, "Ask questions regarding it");
        }
      } catch (e) {
        setPdfName(null);
        onUploadSuccess("", "Upload failed. Please try again.");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === "application/pdf") {
      setPdfName(files[0].name);
      onUploadStart();
      const formData = new FormData();
      formData.append("files", files[0]);
      try {
        const response = await fetch("http://localhost:8000/api/v1/upload", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) throw new Error("Upload failed");
        const data = await response.json();
        if (data.status === "error" || data.status === "partial") {
          setPdfName(null);
          onUploadSuccess("", data.message);
        } else {
          onUploadSuccess(files[0].name, "Ask questions regarding it");
        }
      } catch (e) {
        setPdfName(null);
        onUploadSuccess("", "Upload failed. Please try again.");
      }
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <img
          src={
            process.env.NODE_ENV === "development"
              ? "/images/Photo.jpeg"
              : "/frontend/public/images/Photo.jpeg"
          }
          alt="Logo"
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="font-semibold text-gray-800">planet</span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex items-center flex-row-reverse gap-2 sm:gap-4">
          <Button
            type="button"
            className="flex items-center px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all border border-gray-300"
            style={{ minWidth: 0 }}
            asChild
          >
            <label className="flex items-center cursor-pointer m-0">
              <span className="mr-2 text-lg font-bold">+</span>
              <span className="hidden sm:inline">Upload PDF</span>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={uploading}
                style={{ display: "none" }}
              />
            </label>
          </Button>
          {pdfName && (
            <span
              className="text-sm font-medium text-green-600 truncate max-w-[120px] sm:max-w-xs pr-2 sm:pr-4"
              style={{ paddingRight: 8 }}
            >
              {pdfName}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
