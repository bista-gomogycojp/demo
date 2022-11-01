from rest_framework import serializers

from .models import Category, CategoryItem


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['title', 'place', 'id', 'is_active']


class CategoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryItem
        fields = ['title', 'category', 'image', 'place', 'id', 'url', 'is_active']