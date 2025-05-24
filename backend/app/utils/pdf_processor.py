from fastapi import UploadFile
from pathlib import Path
import aiofiles

async def save_uploaded_file(file: UploadFile, directory: Path) -> Path:
    """
    Save an uploaded file to the specified directory
    """
    file_path = directory / file.filename
    async with aiofiles.open(file_path, 'wb') as f:
        content = await file.read()
        await f.write(content)
    return file_path
