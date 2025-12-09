import os
import django
from PIL import Image
from io import BytesIO

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'flipr_backend.settings')
django.setup()

from core.models import Project
from django.core.files.base import ContentFile

# Create a test image (red square 500x500)
img = Image.new('RGB', (500, 500), color='red')
img_io = BytesIO()
img.save(img_io, format='PNG')
img_io.seek(0)

# Get the existing project
project = Project.objects.first()
if project:
    # Set the thumbnail and cover image
    project.thumbnail.save('test_thumb.png', ContentFile(img_io.read()), save=False)
    
    # Create new image for cover
    img_io.seek(0)
    project.cover_image.save('test_cover.png', ContentFile(img_io.read()), save=True)
    
    print(f"✅ Updated project '{project.title}' with test images")
    print(f"   Thumbnail: {project.thumbnail.name}")
    print(f"   Cover Image: {project.cover_image.name}")
else:
    print("❌ No project found")
