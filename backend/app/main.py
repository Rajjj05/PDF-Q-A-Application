from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import document_routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(document_routes.router, prefix="/api/v1")
