from flask import Blueprint, jsonify
import json
import os
import logging

journey_bp = Blueprint('journey', __name__)
logger = logging.getLogger(__name__)

DATA_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'journeys.json')

@journey_bp.route('/overview', methods=['GET'])
def get_journey_overview():
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Sort by order
        data.sort(key=lambda x: x.get('order', 99))
        
        logger.info("Journey overview requested")
        return jsonify(data), 200
    except Exception as e:
        logger.error(f"Error loading journeys: {e}")
        return jsonify({"error": "Failed to load journey overview"}), 500
