import React from 'react';

interface ChatMessageProps {
  type: 'user' | 'bot';
  message: string;
  avatar?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ type, message, avatar }) => {
  return (
    <div className={`flex items-start space-x-3 mb-6 ${type === 'user' ? 'justify-start' : 'justify-start'}`} data-id="kd2najvf3" data-path="src/components/ChatMessage.tsx">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
      type === 'user' ?
      'bg-purple-100' :
      'bg-green-500'}`
      } data-id="rf9e9r3vm" data-path="src/components/ChatMessage.tsx">
        {type === 'user' ?
        <span className="text-purple-600 font-semibold text-sm" data-id="0yobjwdgz" data-path="src/components/ChatMessage.tsx">S</span> :

        <span className="text-white font-bold text-sm" data-id="js364x79i" data-path="src/components/ChatMessage.tsx">ei</span>
        }
      </div>
      
      <div className={`max-w-3xl ${type === 'user' ? 'bg-transparent' : 'bg-transparent'}`} data-id="twnp982wg" data-path="src/components/ChatMessage.tsx">
        <div className={`text-gray-800 text-sm leading-relaxed ${
        type === 'user' ? 'font-normal' : 'font-normal'}`
        } data-id="k1iw1gtk9" data-path="src/components/ChatMessage.tsx">
          {message}
        </div>
      </div>
    </div>);

};

export default ChatMessage;