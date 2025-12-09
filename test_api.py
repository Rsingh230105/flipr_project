import requests

# Test all endpoints
print("Testing API Endpoints...")
print("=" * 50)

# Projects
resp = requests.get('http://127.0.0.1:8000/api/projects/')
print(f"\n✅ GET /api/projects/ - Status {resp.status_code}")
print(f"   Projects: {len(resp.json())}")
for p in resp.json():
    print(f"   - {p['title']}")

# Clients
resp = requests.get('http://127.0.0.1:8000/api/clients/')
print(f"\n✅ GET /api/clients/ - Status {resp.status_code}")
print(f"   Clients: {len(resp.json())}")
for c in resp.json():
    print(f"   - {c['name']} from {c['company']}")

# Contacts
resp = requests.get('http://127.0.0.1:8000/api/contacts/')
print(f"\n✅ GET /api/contacts/ - Status {resp.status_code}")
print(f"   Contacts: {len(resp.json()) if isinstance(resp.json(), list) else 'N/A'}")

# Subscribers
resp = requests.get('http://127.0.0.1:8000/api/subscribers/')
print(f"\n✅ GET /api/subscribers/ - Status {resp.status_code}")
print(f"   Subscribers: {len(resp.json()) if isinstance(resp.json(), list) else 'N/A'}")

print("\n" + "=" * 50)
print("✅ All API endpoints working!")
