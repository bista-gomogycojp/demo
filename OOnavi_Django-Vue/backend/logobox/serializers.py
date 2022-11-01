from rest_framework import serializers

from .models import LogoBox


class LogoBoxSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogoBox
        fields = ['title', 'url', 'category', 'image', 'is_active', 'place', 'id']


