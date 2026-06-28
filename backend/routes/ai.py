from flask import Blueprint, request, jsonify
from services.ai_service import AIService
import logging

ai_bp = Blueprint('ai', __name__)
logger = logging.getLogger(__name__)

@ai_bp.route('/letter-analyze', methods=['POST'])
def letter_analyze():
    """
    Analyzes a bureaucratic letter.
    Accepts multipart/form-data with a 'file' OR JSON with 'text'.
    """
    text_content = ""
    
    if request.is_json:
        data = request.get_json()
        if 'text' in data:
            text_content = data['text']
    elif 'file' in request.files:
        file_obj = request.files['file']
        if file_obj.filename != '':
            text_content = AIService.extract_text_from_file(file_obj)

    if not text_content or not text_content.strip():
        return jsonify({"error": "No text or file provided"}), 400

    logger.info("AI Letter Analysis triggered")
    
    try:
        result = AIService.summarize_letter(text_content)
        return jsonify(result), 200
    except Exception as e:
        logger.error(f"AI Analysis Error: {e}")
        return jsonify({"error": "Failed to analyze letter"}), 500
