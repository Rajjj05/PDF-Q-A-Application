import React, { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = "Send a message...",
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div
      className="border-t border-gray-200 bg-white px-4 py-4"
      data-id="hmtqdgdv7"
      data-path="src/components/ChatInput.tsx"
    >
      <form
        onSubmit={handleSubmit}
        className="flex items-center space-x-3 max-w-4xl mx-auto"
        data-id="ic3ak9u6f"
        data-path="src/components/ChatInput.tsx"
      >
        <div
          className="flex-1 relative"
          data-id="yxgva7669"
          data-path="src/components/ChatInput.tsx"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            data-id="tjdjhxxtl"
            data-path="src/components/ChatInput.tsx"
          />
        </div>

        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="p-3 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
          data-id="a73agqx81"
          data-path="src/components/ChatInput.tsx"
        >
          <Send
            className="w-4 h-4 text-gray-600"
            data-id="cex20wpl4"
            data-path="src/components/ChatInput.tsx"
          />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
