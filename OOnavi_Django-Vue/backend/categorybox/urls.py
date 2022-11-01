from django.urls import path

from .views import CategoryViewSet, CategoryItemViewSet,ApiItemListView

urlpatterns = [
    path('list', ApiItemListView.as_view()),
    path('category', CategoryViewSet.as_view({ 'get': 'list' })),
    path('category-item', CategoryItemViewSet.as_view({  'get': 'list'})),
    path('category-item/<int:pk>', CategoryItemViewSet.as_view({
        'get': 'retrieve',
    })),

]
