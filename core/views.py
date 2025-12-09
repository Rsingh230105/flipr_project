from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAdminUser, AllowAny
from .models import Project, Client, ContactSubmission, Subscriber
from .serializers import (
    ProjectSerializer, ClientSerializer, ContactSubmissionSerializer, SubscriberSerializer
)


class IsReadOnlyOrAdmin:
    """Simple permission placeholder used in viewsets; using IsAdminUser for write checks in get_permissions below."""


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_permissions(self):
        if self.request.method in ('GET', 'HEAD', 'OPTIONS'):
            return [AllowAny()]
        return [IsAdminUser()]


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

    def get_permissions(self):
        if self.request.method in ('GET', 'HEAD', 'OPTIONS'):
            return [AllowAny()]
        return [IsAdminUser()]


class ContactCreateListView(mixins.ListModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = ContactSubmission.objects.all().order_by('-created_at')
    serializer_class = ContactSubmissionSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAdminUser()]


class SubscriberCreateListView(mixins.ListModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Subscriber.objects.all().order_by('-subscribed_at')
    serializer_class = SubscriberSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAdminUser()]
