import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ryvanta_backend.settings')
django.setup()

from api.serializers import RegistrationSerializer

payload = {
    'team_name': 'Test Team',
    'institution': 'Test Inst',
    'year': '2',
    'leader_name': 'Leader',
    'leader_email': 'leader@test.com',
    'leader_phone': '1234567890',
    'event_name': 'Hackathon',
    'domain': 'Web',
    'user_upi_id': 'test@upi',
    'upi_ref': '123456789012',
    'payment_status': 'pending',
    'members': [{'name': 'Mem 1', 'email': 'm1@test.com'}]
}

serializer = RegistrationSerializer(data=payload)
if not serializer.is_valid():
    print("Errors:", serializer.errors)
else:
    print("Valid!")
    try:
        serializer.save()
        print("Saved successfully!")
    except Exception as e:
        print("Save failed:", e)
