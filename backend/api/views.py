import threading
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from .serializers import RegistrationSerializer

def send_confirmation_email(registration_id, leader_name, leader_email, event_name, team_name):
    subject = f"Registration Confirmation - {event_name}"
    
    # HTML template context
    context = {
        'leader_name': leader_name,
        'team_name': team_name,
        'event_name': event_name,
        'registration_id': registration_id
    }
    
    html_content = render_to_string('emails/registration_confirmation.html', context)
    text_content = strip_tags(html_content)
    
    try:
        msg = EmailMultiAlternatives(
            subject, 
            text_content, 
            getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@ryvanta.com'), 
            [leader_email]
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send(fail_silently=False)
    except Exception as e:
        print(f"Failed to send email: {e}")

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def register(request):
    data = request.data
    
    # Notice we don't pass 'registration_id' here, it's auto-generated in the model
    payload = {
        'team_name': data.get('teamName'),
        'institution': data.get('institution'),
        'year': data.get('year'),
        'leader_name': data.get('leaderName'),
        'leader_email': data.get('leaderEmail'),
        'leader_phone': data.get('leaderPhone'),
        'event_name': data.get('eventName'),
        'domain': data.get('domain'),
        'user_upi_id': data.get('userUpiId'),
        'upi_ref': data.get('upiRef'),
        'payment_status': data.get('paymentStatus', 'pending'),
        'members': data.get('members', [])
    }
    
    serializer = RegistrationSerializer(data=payload)
    if serializer.is_valid():
        registration = serializer.save()
        
        # Send email asynchronously using threading
        email_thread = threading.Thread(
            target=send_confirmation_email,
            args=(
                registration.registration_id,
                registration.leader_name,
                registration.leader_email,
                registration.event_name,
                registration.team_name
            )
        )
        email_thread.start()
        
        return Response({"success": True, "data": serializer.data}, status=status.HTTP_201_CREATED)
    return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
