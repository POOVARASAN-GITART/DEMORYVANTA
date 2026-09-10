import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ryvanta_backend.settings')
django.setup()

from django.test import Client
import json

client = Client()
payload = {
    'teamName': 'Test Team 3',
    'institution': 'Test Inst',
    'year': '2',
    'leaderName': 'Leader',
    'leaderEmail': 'leader@test.com',
    'leaderPhone': '1234567890',
    'eventName': 'Hackathon',
    'domain': 'Web',
    'userUpiId': 'test@upi',
    'upiRef': '123456789012',
    'paymentStatus': 'pending',
    'members': []
}

response = client.post('/api/register/', json.dumps(payload), content_type='application/json')
print("Status Code:", response.status_code)
print("Response JSON:", response.json())
