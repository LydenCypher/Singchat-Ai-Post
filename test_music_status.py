#!/usr/bin/env python3
import requests
import uuid

BACKEND_URL = "https://a9c62eca-b513-4033-a492-2bc050ebfe45.preview.emergentagent.com/api"

# Test with a fake UUID to see if the 404 handling works correctly now
fake_id = str(uuid.uuid4())
print(f"Testing music status with fake ID: {fake_id}")

response = requests.get(f"{BACKEND_URL}/music/status/{fake_id}", timeout=10)
print(f"Status Code: {response.status_code}")
print(f"Response: {response.text}")

if response.status_code == 404:
    print("✅ Properly handles non-existent music entries")
else:
    print(f"❌ Unexpected status: {response.status_code}")