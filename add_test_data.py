import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'flipr_backend.settings')
django.setup()

from core.models import Project, Client

# Create test project
project = Project.objects.create(
    title="Portfolio Website",
    slug="portfolio-website",
    description="A beautiful responsive portfolio website built with modern web technologies.",
    live_url="https://example.com/portfolio",
    featured=True
)

print(f"✅ Created project: {project.title}")

# Create test clients
client1 = Client.objects.create(
    name="John Smith",
    company="Tech Solutions Inc",
    testimonial="Amazing work on our project. Highly recommended!",
    website="https://techsolutions.com"
)

client2 = Client.objects.create(
    name="Sarah Johnson",
    company="Design Studio Co",
    testimonial="Professional and creative. Delivered exactly what we needed.",
    website="https://designstudio.com"
)

print(f"✅ Created clients: {client1.name}, {client2.name}")
