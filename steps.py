from flask import Blueprint, request, jsonify, current_app

documents_bp = Blueprint('documents_bp', __name__)

@documents_bp.route('/api/documents', methods=['GET'])
def get_documents():
    user_type = request.args.get('user_type')
    
    if not user_type:
        return jsonify({"error": "Missing required query parameter: user_type"}), 400
        
    if user_type not in ['student', 'worker']:
        return jsonify({"error": "Invalid user_type. Must be 'student' or 'worker'."}), 400
        
    data = current_app.config.get('DOCUMENTS_DATA')
    
    if not data or 'user_types' not in data:
        return jsonify({"error": "Documents data is currently unavailable."}), 500
        
    user_info = data['user_types'].get(user_type)
    
    if not user_info or 'documents' not in user_info:
        return jsonify({"error": f"No documents found for user_type: {user_type}"}), 404
        
    response = {
        "user_type": user_type,
        "documents": user_info['documents'],
        "last_validated_at": data.get("last_validated_at"),
        "source_url": data.get("source_url")
    }
    
    return jsonify(response), 200
