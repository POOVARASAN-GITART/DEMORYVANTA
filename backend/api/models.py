from django.db import models

class Registration(models.Model):
    registration_id = models.CharField(max_length=20, unique=True, blank=True)
    team_name = models.CharField(max_length=100)
    institution = models.CharField(max_length=200)
    year = models.CharField(max_length=50, blank=True, null=True)
    leader_name = models.CharField(max_length=100)
    leader_email = models.EmailField()
    leader_phone = models.CharField(max_length=20)
    event_name = models.CharField(max_length=100)
    domain = models.CharField(max_length=100, blank=True, null=True)
    user_upi_id = models.CharField(max_length=100, blank=True, null=True)
    upi_ref = models.CharField(max_length=100, blank=True, null=True)
    payment_status = models.CharField(max_length=20, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.registration_id:
            event_name_lower = self.event_name.lower()
            if 'hackathon' in event_name_lower:
                prefix = 'TIC1'
            elif 'game' in event_name_lower or '2d' in event_name_lower:
                prefix = 'TIC2'
            elif 'ctf' in event_name_lower or 'capture' in event_name_lower:
                prefix = 'TIC3'
            else:
                prefix = 'TIC0'

            last_reg = Registration.objects.filter(registration_id__startswith=prefix).order_by('id').last()
            if last_reg and len(last_reg.registration_id) > len(prefix):
                try:
                    last_number = int(last_reg.registration_id[len(prefix):])
                    new_number = last_number + 1
                except ValueError:
                    new_number = 1
            else:
                new_number = 1
            
            self.registration_id = f"{prefix}{new_number:02d}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.registration_id} - {self.team_name}"

class TeamMember(models.Model):
    registration = models.ForeignKey(Registration, related_name='members', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return self.name
