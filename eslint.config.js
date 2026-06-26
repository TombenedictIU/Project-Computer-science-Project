import io

class AIService:
    @staticmethod
    def summarize_letter(text: str) -> dict:
        """
        Stub for an AI service (e.g. OpenAI, Anthropic, or local model).
        In a real application, you would pass `text` to an LLM to generate
        a summary, actions, and draft reply.
        """
        # Mock response based on input length or basic keyword matching
        return {
            "summary": "This document appears to be an official notification from a German authority. It requires you to submit additional documentation to complete your application process.",
            "actions": [
                {
                    "id": "action_1",
                    "description": "Submit a copy of your health insurance certificate.",
                    "deadline": "Within 14 days"
                },
                {
                    "id": "action_2",
                    "description": "Provide proof of financial resources (blocked account confirmation).",
                    "deadline": "Within 14 days"
                }
            ],
            "draft_reply_de": "Sehr geehrte Damen und Herren,\n\nvielen Dank für Ihr Schreiben. Anbei übersende ich Ihnen die geforderten Unterlagen (Krankenversicherungsnachweis und Sperrkontobestätigung).\n\nMit freundlichen Grüßen,\n[Dein Name]"
        }
        
    @staticmethod
    def extract_text_from_file(file_storage) -> str:
        """
        Stub to extract text from a file upload (PDF/image).
        """
        filename = file_storage.filename.lower()
        if filename.endswith(".pdf"):
            try:
                import PyPDF2
                pdf_reader = PyPDF2.PdfReader(file_storage)
                text = ""
                for page in pdf_reader.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
                return text
            except ImportError:
                return "PyPDF2 is not installed. Extracted mock text from PDF."
            except Exception as e:
                return f"Error extracting PDF: {str(e)}"
        elif filename.endswith((".png", ".jpg", ".jpeg")):
            # OCR would go here (e.g. pytesseract)
            return "OCR text extraction is not implemented yet. This is mock extracted text from an image."
        else:
            # Try basic decode
            try:
                return file_storage.read().decode("utf-8")
            except:
                return "Could not decode file content."
