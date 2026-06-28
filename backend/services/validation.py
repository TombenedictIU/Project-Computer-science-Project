import re
from datetime import datetime

ALLOWED_DOMAINS = [
    r'https://[^/]*\.de(/.*)?',
    r'https://[^/]*\.berlin\.de(/.*)?'
]

def is_valid_url(url):
    """Checks if a URL uses HTTPS and belongs to an allowed domain."""
    if not url.startswith('https://'):
        return False
    
    for domain_pattern in ALLOWED_DOMAINS:
        if re.match(domain_pattern, url):
            return True
    return False

def validate_iso8601(date_string):
    """Validates if a string is a valid ISO-8601 datetime."""
    try:
        datetime.fromisoformat(date_string.replace('Z', '+00:00'))
        return True
    except (ValueError, TypeError):
        return False

def validate_dataset(dataset_name, data):
    """Validates the structure of a given dataset, logging warnings for issues."""
    issues = []
    
    if not data:
        return [f"{dataset_name}: Dataset is empty or could not be loaded."]

    # Check top-level validation info (if present at top level, like in steps/documents)
    if 'last_validated_at' in data:
        if not validate_iso8601(data['last_validated_at']):
            issues.append(f"{dataset_name}: Invalid or missing 'last_validated_at' at top level.")
    
    if 'source_url' in data:
        if not is_valid_url(data['source_url']):
            issues.append(f"{dataset_name}: Invalid or unapproved 'source_url' ({data['source_url']}).")
            
    # For lists like cities, check each item
    if isinstance(data, list):
        for index, item in enumerate(data):
            if isinstance(item, dict):
                # If city has a nested offices list
                if 'offices' in item:
                    for office in item['offices']:
                        if 'last_validated_at' not in office or not validate_iso8601(office['last_validated_at']):
                            issues.append(f"{dataset_name} (City {item.get('city')}): Missing or invalid 'last_validated_at' for office.")
                        if 'source_url' not in office or not is_valid_url(office['source_url']):
                            issues.append(f"{dataset_name} (City {item.get('city')}): Invalid 'source_url' for office.")
                        if 'appointment_url' in office and not is_valid_url(office['appointment_url']):
                            issues.append(f"{dataset_name} (City {item.get('city')}): Invalid 'appointment_url' for office.")
                            
    # For dictionary with lists like documents
    elif isinstance(data, dict):
        # We handled top level, let's check nested if any explicit logic is needed
        pass

    return issues

def validate_all_data(data_dict):
    """Runs validation on all loaded datasets and prints warnings."""
    all_issues = []
    for name, data in data_dict.items():
        issues = validate_dataset(name, data)
        all_issues.extend(issues)
        
    if all_issues:
        print("\n--- DATA VALIDATION WARNINGS ---")
        for issue in all_issues:
            print(f"WARN: {issue}")
        print("--------------------------------\n")
    else:
        print("\n--- DATA VALIDATION: OK ---\n")
    
    return all_issues
