from flask import Blueprint, jsonify, request, current_app

visa_bp = Blueprint('visa', __name__, url_prefix='/api/visa')

@visa_bp.route('/steps', methods=['GET'])
def get_steps():
    country = request.args.get('country')
    study_type = request.args.get('study_type')
    
    if not country or not study_type:
        return jsonify({"error": "Missing required query parameters: country, study_type"}), 400
        
    valid_countries = ['india', 'germany']
    valid_study_types = ['bachelor', 'master', 'language_course', 'studienkolleg']
    
    if country not in valid_countries or study_type not in valid_study_types:
        return jsonify({"error": "Invalid query parameters"}), 400

    workflow = 'apply_from_india' if country == 'india' else 'apply_in_germany'
    
    all_steps = current_app.config.get('VISA_STEPS_DATA', [])
    filtered_steps = [s for s in all_steps if s.get('workflow') == workflow]
    
    # Assuming all items in filtered steps come from same source for simplicity of timestamp
    last_validated_at = filtered_steps[0].get('last_validated_at') if filtered_steps else None
    
    return jsonify({
        "country": country,
        "study_type": study_type,
        "workflow": workflow,
        "steps": sorted(filtered_steps, key=lambda x: x.get('order', 0)),
        "last_validated_at": last_validated_at,
        "source_urls": list(set([s.get('source_url') for s in filtered_steps if s.get('source_url')]))
    })

@visa_bp.route('/checklist', methods=['GET'])
def get_checklist():
    country = request.args.get('country')
    study_type = request.args.get('study_type')
    funding_mode = request.args.get('funding_mode')
    
    if not country or not study_type or not funding_mode:
        return jsonify({"error": "Missing required parameters: country, study_type, funding_mode"}), 400
        
    profiles = current_app.config.get('VISA_PROFILES_DATA', [])
    items_data = current_app.config.get('VISA_ITEMS_DATA', {}).get('items', [])
    items_dict = {item['id']: item for item in items_data}
    
    # Find matching profile
    profile = next((p for p in profiles if p.get('country') == country and 
                   p.get('study_type') == study_type and 
                   p.get('funding_mode') == funding_mode), None)
                   
    if not profile:
        return jsonify({"error": "No matching profile found"}), 404
        
    required_items = [items_dict[i] for i in profile.get('required_item_ids', []) if i in items_dict]
    optional_items = [items_dict[i] for i in profile.get('optional_item_ids', []) if i in items_dict]
    
    return jsonify({
        "country": profile['country'],
        "study_type": profile['study_type'],
        "funding_mode": profile['funding_mode'],
        "required_items": required_items,
        "optional_items": optional_items,
        "last_validated_at": profile.get('last_validated_at'),
        "source_urls": [profile.get('source_url')]
    })

@visa_bp.route('/finance', methods=['GET'])
def get_finance():
    finance_data = current_app.config.get('FINANCE_INSURANCE_DATA', {}).get('finance', {})
    return jsonify(finance_data)

@visa_bp.route('/insurance', methods=['GET'])
def get_insurance():
    insurance_data = current_app.config.get('FINANCE_INSURANCE_DATA', {}).get('insurance', {})
    return jsonify(insurance_data)

@visa_bp.route('/locations', methods=['GET'])
def get_locations():
    country = request.args.get('country')
    
    if not country or country not in ['india', 'germany']:
        return jsonify({"error": "Invalid or missing country parameter. Must be 'india' or 'germany'."}), 400
        
    locations_data = current_app.config.get('EMBASSIES_OFFICES_DATA', {})
    locations = locations_data.get(country, [])
    
    return jsonify({
        "country": country,
        "locations": locations
    })

@visa_bp.route('/checklist-history', methods=['GET'])
def get_checklist_history():
    country = request.args.get('country')
    study_type = request.args.get('study_type')
    funding_mode = request.args.get('funding_mode')
    
    if not country or not study_type or not funding_mode:
        return jsonify({"error": "Missing required parameters"}), 400
        
    # Stub for checklist history, returning mock previous versions
    history = [
        {
            "version": "1.1.0",
            "changed_at": "2026-05-15T10:00:00Z",
            "change_notes": "Added requirement for APS certificate for Indian students."
        },
        {
            "version": "1.0.0",
            "changed_at": "2025-10-01T08:00:00Z",
            "change_notes": "Initial checklist version."
        }
    ]
    
    return jsonify(history), 200
