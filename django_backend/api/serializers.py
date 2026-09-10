from rest_framework import serializers
from .models import Registration, TeamMember

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['name', 'email']

class RegistrationSerializer(serializers.ModelSerializer):
    members = TeamMemberSerializer(many=True, required=False)

    class Meta:
        model = Registration
        fields = '__all__'
        read_only_fields = ['registration_id']

    def create(self, validated_data):
        members_data = validated_data.pop('members', [])
        registration = Registration.objects.create(**validated_data)
        for member_data in members_data:
            TeamMember.objects.create(registration=registration, **member_data)
        return registration
