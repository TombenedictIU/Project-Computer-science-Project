from flask import Blueprint, request, jsonify
import json
import os
import logging
from datetime import datetime

feedback_bp = Blueprint('feedback', __name__)
logger = logging.getLogger(__name__)

# Very simple storage for feedback
DATA_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'feedback_data.json')

@feedback_bp.route('/', methods=['POST'])
def submit_feedback():
    try:
        data = request.get_json()
        rating = data.get('rating')
        message = data.get('message', '')
        module = data.get('module', 'general')
        
        entry = {
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "rating": rating,
            "message": message,
            "module": module
        }
        
        # Load existing
        feedback_list = []
        if os.path.exists(DATA_FILE):
            with open(DATA_FILE, 'r', encoding='utf-8') as f:
                feedback_list = json.load(f)
                
        feedback_list.append(entry)
        
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(feedback_list, f, indent=2)
            
        logger.info(f"Feedback received for module: {module}, rating: {rating}")
        return jsonify({"success": True, "message": "Feedback submitted successfully"}), 201
    except Exception as e:
        logger.error(f"Error saving feedback: {e}")
        return jsonify({"error": "Failed to submit feedback"}), 500
