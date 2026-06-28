from flask import Blueprint, jsonify, current_app

admin_bp = Blueprint('admin_bp', __name__)

@admin_bp.route('/api/admin/data-status', methods=['GET'])
def get_data_status():
    status_report = []
    
    steps_data = current_app.config.get('STEPS_DATA')
    if steps_data:
        status_report.append({
            "dataset": "anmeldung_steps",
            "last_validated_at": steps_data.get("last_validated_at"),
            "status": "OK"
        })
        
    docs_data = current_app.config.get('DOCUMENTS_DATA')
    if docs_data:
        status_report.append({
            "dataset": "documents",
            "last_validated_at": docs_data.get("last_validated_at"),
            "status": "OK"
        })
        
    cities_data = current_app.config.get('CITIES_DATA')
    if cities_data:
        # Check latest validated among cities
        try:
            latest = max(
                office.get("last_validated_at", "")
                for city in cities_data
                for office in city.get("offices", [])
                if office.get("last_validated_at")
            )
        except ValueError:
            latest = None
            
        status_report.append({
            "dataset": "cities",
            "last_validated_at": latest,
            "status": "OK"
        })
        
    return jsonify({
        "status": "OK",
        "datasets": status_report,
        "warnings": current_app.config.get('VALIDATION_WARNINGS', [])
    }), 200

@admin_bp.route('/api/admin/visa-data-status', methods=['GET'])
def get_visa_data_status():
    status_report = []
    
    datasets = [
        ('visa_steps', 'VISA_STEPS_DATA'),
        ('visa_items', 'VISA_ITEMS_DATA'),
        ('visa_profiles', 'VISA_PROFILES_DATA'),
        ('embassies_and_offices', 'EMBASSIES_OFFICES_DATA'),
        ('finance_and_insurance', 'FINANCE_INSURANCE_DATA')
    ]
    
    for name, config_key in datasets:
        data = current_app.config.get(config_key)
        
        last_validated = None
        if isinstance(data, dict):
            # For dicts with last_validated_at at top level or nested
            if 'last_validated_at' in data:
                last_validated = data['last_validated_at']
            elif 'finance' in data and 'last_validated_at' in data['finance']:
                last_validated = data['finance']['last_validated_at']
        elif isinstance(data, list) and len(data) > 0:
            if isinstance(data[0], dict) and 'last_validated_at' in data[0]:
                last_validated = data[0]['last_validated_at']
                
        if data:
            status_report.append({
                "dataset": name,
                "last_validated_at": last_validated,
                "status": "OK"
            })
            
    return jsonify({
        "status": "OK",
        "datasets": status_report
    }), 200

@admin_bp.route('/api/admin/link-status', methods=['GET'])
def get_link_status():
    import os, json
    data_file = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'link_status.json')
    if os.path.exists(data_file):
        with open(data_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return jsonify(data), 200
    return jsonify([]), 200

@admin_bp.route('/api/admin/run-link-check', methods=['POST'])
def run_link_check():
    try:
        from tasks.link_checker import run_link_checker_async
        result = run_link_checker_async()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_bp.route('/api/admin/metrics', methods=['GET'])
def get_metrics():
    # Stub for metrics
    return jsonify({
        "requests_total": 1500,
        "errors_total": 23,
        "active_users": 42
    }), 200

@admin_bp.route('/api/admin/analytics', methods=['GET'])
def get_analytics():
    # Stub for usage analytics
    return jsonify({
        "anmeldung": {"calls_last_7_days": 123},
        "visa": {"calls_last_7_days": 456},
        "ai": {"calls_last_7_days": 78},
        "journey": {"calls_last_7_days": 112}
    }), 200
