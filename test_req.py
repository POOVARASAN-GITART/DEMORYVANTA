import urllib.request
import json

url = 'http://127.0.0.1:8000/api/register'
data = {
    'teamName': 'Test Team 2',
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

req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers={'Content-Type': 'application/json'})
try:
    with urllib.request.urlopen(req) as response:
        print("Status:", response.status)
        print("Response:", response.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print("HTTP Error:", e.code)
    print("Error Response:", e.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
