from flask import Blueprint, jsonify, current_app

steps_bp = Blueprint('steps_bp', __name__)

@steps_bp.route('/api/steps', methods=['GET'])
def get_steps():
    data = current_app.config.get('STEPS_DATA')
    
    if not data:
        return jsonify({"error": "Steps data is currently unavailable."}), 500
        
    return jsonify(data), 200
