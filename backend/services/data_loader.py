import json
import os

def load_json_data(file_name):
    """Loads a JSON file from the data directory safely."""
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    file_path = os.path.join(base_dir, 'data', file_name)
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: Could not find data file {file_path}")
        return None
    except json.JSONDecodeError:
        print(f"Error: Could not parse JSON from {file_path}")
        return None
