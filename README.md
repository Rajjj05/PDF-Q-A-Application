# PDF Q&A Full-Stack Application

## Overview

This project is a full-stack application that allows users to upload PDF documents, ask questions about their content, and receive answers powered by advanced Large Language Models (LLMs). It features a modern, user-friendly chat interface and supports exporting chat history.

---

## Features

- **PDF Upload:** Users can upload one or more PDF files for analysis.
- **PDF Text Extraction:** Extracts text from uploaded PDFs using PyMuPDF.
- **Q&A Chat Interface:** Ask questions about the uploaded PDFs and get instant answers from an LLM (Groq Llama-4-Scout-17B via LangChain).
- **Document Metadata Storage:** Stores PDF metadata (filename, path, upload date) in PostgreSQL.
- **Chat History Export:** Download your chat as a `.txt` file for future reference.
- **Responsive UI:** Works seamlessly on both desktop and mobile devices.
- **Error Handling:** Notifies users if a PDF cannot be read or processed.

---

## Tech Stack

### Backend

- **FastAPI**: High-performance Python web framework for building APIs
- **LangChain**: Framework for LLM-powered applications
- **Groq Llama-4-Scout-17B**: Large Language Model for Q&A
- **PyMuPDF (fitz)**: PDF text extraction
- **PostgreSQL**: Document metadata storage
- **dotenv**: Environment variable management

### Frontend

- **React 18**: Modern UI library
- **TypeScript**: Type safety for frontend code
- **TailwindCSS**: Utility-first CSS framework
- **ShadCN UI**: Accessible, customizable UI components
- **file-saver**: For exporting chat history

---

## How It Works

1. **Upload PDF(s):** Drag and drop or select PDF files to upload.
2. **Ask Questions:** Use the chat interface to ask questions about the content of your uploaded PDFs.
3. **Get Answers:** The backend extracts text, runs your query through an LLM, and returns an answer.
4. **Export Chat:** Download your chat history as a `.txt` file with one click.

---

## Project Structure

- `backend/` — FastAPI app, document processing, LLM integration, and database logic
- `frontend/` — React app with chat UI, PDF upload, and chat export

---

## Getting Started

See the `frontend/README.md` and `backend/requirements.txt` for setup instructions.

---

## Author

Bhavya Raj Singh

---

## License

This project is for educational and demonstration purposes.
