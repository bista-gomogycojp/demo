from django.urls import path
from .views import CustomUserCreate, LoginView, UserProfileView, UpdateProfileView, UpdateImage, ChangePasswordView, SendEmailContact, UserLogoSortView, UserCategoryView, UserCategoryItemView, UserPaginationView, UserDarkView

app_name = 'users'

urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('login/', LoginView.as_view(), name="login"),
    path('profile/', UserProfileView.as_view(), name="profile"),
    path('update-profile/<int:pk>/', UpdateProfileView.as_view(), name='update_profile'),
    path('upload/<int:pk>/', UpdateImage.as_view(), name='upload'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('contact/', SendEmailContact.as_view(), name='contact'),
    path('upLogo/<int:pk>/', UserLogoSortView.as_view(), name="save_logo"),
    path('upCategory/<int:pk>/', UserCategoryView.as_view(), name="save_category"),
    path('upCategoryItem/<int:pk>/', UserCategoryItemView.as_view(), name="save_category"),
    path('upPagination/<int:pk>/', UserPaginationView.as_view(), name="save_pagination"),
    path('upDark/<int:pk>/', UserDarkView.as_view(), name="save_dark"),

]