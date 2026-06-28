from flask import Flask, jsonify
from flask_cors import CORS
from services.data_loader import load_json_data
from services.validation import validate_all_data
from routes.steps import steps_bp
from routes.documents import documents_bp
from routes.cityinfo import cityinfo_bp
from routes.admin import admin_bp
from routes.visa import visa_bp
from routes.ai import ai_bp
from routes.journey import journey_bp
from routes.risk import risk_bp
from routes.feedback import feedback_bp
from routes.org import org_bp
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')

def create_app():
    app = Flask(__name__)
    # Enable CORS for the frontend app
    CORS(app)
    
    # Load JSON data
    print("Loading data...")
    steps_data = load_json_data('anmeldung_steps.json')
    documents_data = load_json_data('documents.json')
    cities_data = load_json_data('cities.json')
    
    visa_steps_data = load_json_data('visa_steps.json')
    visa_items_data = load_json_data('visa_items.json')
    visa_profiles_data = load_json_data('visa_profiles.json')
    embassies_offices_data = load_json_data('embassies_and_offices.json')
    finance_insurance_data = load_json_data('finance_and_insurance.json')
    
    app.config['STEPS_DATA'] = steps_data
    app.config['DOCUMENTS_DATA'] = documents_data
    app.config['CITIES_DATA'] = cities_data
    
    app.config['VISA_STEPS_DATA'] = visa_steps_data
    app.config['VISA_ITEMS_DATA'] = visa_items_data
    app.config['VISA_PROFILES_DATA'] = visa_profiles_data
    app.config['EMBASSIES_OFFICES_DATA'] = embassies_offices_data
    app.config['FINANCE_INSURANCE_DATA'] = finance_insurance_data
    
    # Run validation
    print("Validating data...")
    data_dict = {
        'anmeldung_steps': steps_data,
        'documents': documents_data,
        'cities': cities_data,
        'visa_steps': visa_steps_data,
        'visa_items': visa_items_data,
        'visa_profiles': visa_profiles_data,
        'embassies_and_offices': embassies_offices_data,
        'finance_and_insurance': finance_insurance_data
    }
    warnings = validate_all_data(data_dict)
    app.config['VALIDATION_WARNINGS'] = warnings
    
    # Register Blueprints
    app.register_blueprint(steps_bp)
    app.register_blueprint(documents_bp)
    app.register_blueprint(cityinfo_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(visa_bp)
    app.register_blueprint(ai_bp, url_prefix='/api/ai')
    app.register_blueprint(journey_bp, url_prefix='/api/journey')
    app.register_blueprint(risk_bp, url_prefix='/api/risk')
    app.register_blueprint(feedback_bp, url_prefix='/api/feedback')
    app.register_blueprint(org_bp, url_prefix='/api/org')
    
    # Health check / base route
    @app.route('/')
    def index():
        return jsonify({
            "message": "Welcome to the AbroadEase API",
            "version": "1.0.0",
            "docs": "Phase 1: Anmeldung Workflow endpoints are active under /api/"
        }), 200
        
    # Global error handlers
    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"error": "Resource not found"}), 404

    @app.errorhandler(500)
    def internal_error(e):
        return jsonify({"error": "Internal server error"}), 500
        
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
