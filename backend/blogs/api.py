from .models import Blog
from rest_framework import viewsets, permissions
from .serializers import BlogSerializer


class BlogViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = BlogSerializer

    def get_queryset(self):
        # show the blogs of the requested user only
        return self.request.user.blogs.all()  # as related_name (in models) = blogs

    # saving user credentials (through owner field) in serializer
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
