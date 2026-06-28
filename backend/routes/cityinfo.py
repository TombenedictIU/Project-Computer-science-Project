from flask import Blueprint, request, jsonify, current_app

cityinfo_bp = Blueprint('cityinfo_bp', __name__)

@cityinfo_bp.route('/api/cityinfo', methods=['GET'])
def get_cityinfo():
    city = request.args.get('city')
    
    if not city:
        return jsonify({"error": "Missing required query parameter: city"}), 400
        
    city = city.lower().strip()
    data = current_app.config.get('CITIES_DATA')
    
    if not data or 'cities' not in data:
        return jsonify({"error": "City data is currently unavailable."}), 500
        
    # Search for the requested city in the dictionary
    city_info = data['cities'].get(city)
    
    if not city_info:
        return jsonify({"error": f"City '{city}' is not currently supported or not found."}), 404
        
    # Format to match what the frontend expects
    response = {
        "city": city_info.get("display_name", city.capitalize()),
        "offices": city_info.get("offices", [])
    }
        
    return jsonify(response), 200
