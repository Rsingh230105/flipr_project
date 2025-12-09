from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, ClientViewSet, ContactCreateListView, SubscriberCreateListView

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'clients', ClientViewSet, basename='client')
router.register(r'contacts', ContactCreateListView, basename='contact')
router.register(r'subscribers', SubscriberCreateListView, basename='subscriber')

urlpatterns = [
    path('', include(router.urls)),
]
