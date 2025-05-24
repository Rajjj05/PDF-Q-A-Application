from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.document_service import DocumentService
from typing import List
from pydantic import BaseModel

router = APIRouter()
document_service = DocumentService()

class QueryRequest(BaseModel):
    query: str

@router.post("/upload")
async def upload_documents(files: List[UploadFile] = File(...)):
    """
    Upload one or more PDF documents for processing
    """
    try:
        response = await document_service.process_documents(files)
        return {"message": "Documents processed successfully", "count": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/query")
async def query_documents(request: QueryRequest):
    """
    Query the processed documents using natural language
    """
    try:
        response = await document_service.query_documents(request.query)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
