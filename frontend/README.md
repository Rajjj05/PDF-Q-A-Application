# PDF Q&A Frontend

This is the frontend for the PDF Q&A application. It allows users to upload PDF documents, ask questions about their content, and receive answers using a modern chat interface. Users can also export their chat history. The frontend is built with React, TypeScript, Vite, TailwindCSS, and ShadCN UI.

---

## ✨ Features

- **PDF Upload:** Drag and drop or select PDF files to upload for analysis.
- **Chat Q&A:** Ask questions about the uploaded PDFs and get instant answers from an advanced LLM (Groq Llama-4-Scout-17B via LangChain backend).
- **Chat History Export:** Download your chat as a `.txt` file for future reference.
- **Responsive UI:** Works seamlessly on both desktop and mobile devices.
- **Error Handling:** Notifies you if a PDF cannot be read or processed.
- **Custom Branding:** Uses your own logo in the header.

---

## 🛠️ Tech Stack

- **React 18**
- **TypeScript**
- **Vite**
- **TailwindCSS**
- **ShadCN UI**
- **file-saver** (for chat export)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)

### Installation

1. Go to the `frontend` directory:
   ```powershell
   cd frontend
   ```
2. Install dependencies:
   ```powershell
   npm install
   # or
   yarn
   # or
   pnpm install
   ```
3. Set the backend API URL in `.env` (already set to default):
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   ```
4. Start the development server:
   ```powershell
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
5. Open your browser and visit [http://localhost:5173](http://localhost:5173)

---

## 🧑‍💻 How to Use

1. **Upload PDF(s):** Click the upload button in the header or drag and drop your PDF file.
2. **Ask Questions:** Use the chat box to ask questions about your uploaded document.
3. **Get Answers:** The app will display answers from the backend LLM.
4. **Export Chat:** Click the "Download Chat History" button to save your conversation as a `.txt` file.

---

## 📁 Project Structure

```
frontend/
├── public/
│   └── images/Photo.jpeg   # Your logo used in the header
├── src/
│   ├── components/         # UI and chat components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── pages/              # Main pages (HomePage, etc.)
│   ├── services/           # API service for backend communication
│   └── App.tsx, main.tsx   # App entry points
├── .env                    # API base URL config
├── tailwind.config.ts      # TailwindCSS config
├── vite.config.ts          # Vite config
└── ...
```

---

## 🤝 Backend

This frontend works with the FastAPI backend in the `../backend` folder. Make sure the backend is running for full functionality.

---

## 👤 Author

Bhavya Raj Singh

---

## 📜 License

This project is for educational and demonstration purposes.
