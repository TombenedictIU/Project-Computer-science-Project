from flask import Blueprint, request, jsonify
import json
import os
import logging

org_bp = Blueprint('org', __name__)
logger = logging.getLogger(__name__)

DATA_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'org_notes.json')

@org_bp.route('/notes', methods=['GET'])
def get_org_notes():
    try:
        org_id = request.args.get('org_id')
        module = request.args.get('module')
        
        if not org_id or not module:
            return jsonify({"error": "org_id and module are required"}), 400
            
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        notes = data.get(org_id, {}).get(module, [])
        return jsonify(notes), 200
        
    except Exception as e:
        logger.error(f"Error fetching org notes: {e}")
        return jsonify({"error": "Failed to fetch org notes"}), 500
