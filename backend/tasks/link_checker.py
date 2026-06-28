import json
import os
import datetime
import urllib.request
import urllib.error
import threading

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')
STATUS_FILE = os.path.join(DATA_DIR, 'link_status.json')

def check_urls(urls):
    """
    Checks a list of URLs and updates link_status.json.
    Runs synchronously. Should be called via a thread/task runner.
    """
    status_data = []
    if os.path.exists(STATUS_FILE):
        try:
            with open(STATUS_FILE, 'r', encoding='utf-8') as f:
                status_data = json.load(f)
        except:
            status_data = []

    # Map existing statuses by URL
    status_map = {item["url"]: item for item in status_data if "url" in item}

    for url in urls:
        if not url or not url.startswith("http"):
            continue
            
        print(f"Checking URL: {url}")
        status_code = None
        is_broken = False
        
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            response = urllib.request.urlopen(req, timeout=10)
            status_code = response.getcode()
            is_broken = status_code >= 400
        except urllib.error.HTTPError as e:
            status_code = e.code
            is_broken = True
        except Exception as e:
            status_code = 0 # connection error
            is_broken = True
            
        status_map[url] = {
            "url": url,
            "last_checked_at": datetime.datetime.utcnow().isoformat() + "Z",
            "status_code": status_code,
            "is_broken": is_broken
        }

    # Save back
    new_data = list(status_map.values())
    try:
        with open(STATUS_FILE, 'w', encoding='utf-8') as f:
            json.dump(new_data, f, indent=2)
        print("Link check completed and saved.")
    except Exception as e:
        print(f"Failed to save link_status.json: {e}")

def extract_all_urls_from_data():
    """
    Utility to load known data files and extract 'source_url's.
    """
    urls = set()
    files_to_check = [
        'anmeldung_steps.json', 'documents.json', 'visa_steps.json', 
        'visa_items.json', 'finance_and_insurance.json', 'embassies_and_offices.json',
        'risk_profiles.json'
    ]
    
    for filename in files_to_check:
        filepath = os.path.join(DATA_DIR, filename)
        if os.path.exists(filepath):
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    # Recursively find source_url
                    def find_urls(obj):
                        if isinstance(obj, dict):
                            for k, v in obj.items():
                                if k == 'source_url' and isinstance(v, str):
                                    urls.add(v)
                                else:
                                    find_urls(v)
                        elif isinstance(obj, list):
                            for item in obj:
                                find_urls(item)
                    find_urls(data)
            except:
                pass
    return list(urls)

def run_link_checker_async():
    """
    Spawns a background thread to run the link checker.
    """
    urls = extract_all_urls_from_data()
    thread = threading.Thread(target=check_urls, args=(urls,))
    thread.daemon = True
    thread.start()
    return {"message": f"Started checking {len(urls)} URLs in the background."}
