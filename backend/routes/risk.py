from flask import Blueprint, request, jsonify
import json
import os
import logging

risk_bp = Blueprint('risk', __name__)
logger = logging.getLogger(__name__)

DATA_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'risk_profiles.json')

@risk_bp.route('/analyze-profile', methods=['POST'])
def analyze_profile():
    try:
        profile = request.get_json() or {}
        country = profile.get('country', '').lower()
        study_type = profile.get('study_type', '').lower()
        
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            risks = json.load(f)
            
        applicable_risks = []
        for risk in risks:
            if risk.get('country') == country:
                if study_type in risk.get('applies_to', []) or not risk.get('applies_to'):
                    applicable_risks.append(risk)
                    
        # Sort by severity: high > medium > low
        severity_order = {"high": 1, "medium": 2, "low": 3}
        applicable_risks.sort(key=lambda x: severity_order.get(x.get('severity', 'low'), 99))
        
        logger.info(f"Risk analysis run for profile country={country}")
        return jsonify(applicable_risks), 200
        
    except Exception as e:
        logger.error(f"Error analyzing risk: {e}")
        return jsonify({"error": "Failed to analyze risk profile"}), 500
