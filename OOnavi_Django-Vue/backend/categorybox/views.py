from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Category, CategoryItem
from .mypaginations import MyPageNumberPagination
from .searchpagination import SearchNumberPagination
from .serializers import CategorySerializer, CategoryItemSerializer
from rest_framework import filters
from rest_framework import generics
# category
class CategoryViewSet(viewsets.GenericViewSet):
    def list(self, request):
        categories = Category.objects.filter(is_active=True)
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

class CategoryItemViewSet(viewsets.GenericViewSet):

    def list(self, request):
        categories_item = CategoryItem.objects.filter(is_active=True)
        serializer = CategoryItemSerializer(categories_item, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        categories_item = CategoryItem.objects.filter(category=pk)
        serializer = CategoryItemSerializer(categories_item, many=True)
        return Response(serializer.data)

class ApiItemListView(generics.ListAPIView):
    queryset = CategoryItem.objects.filter(is_active=True)
    serializer_class = CategoryItemSerializer
    pagination_class = SearchNumberPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['title']
