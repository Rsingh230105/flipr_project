"""Core models: Project, Client, ContactSubmission, Subscriber.
Image cropping performed on save() using Pillow (local storage).
"""
from io import BytesIO
import os

from django.core.files.base import ContentFile
from django.db import models
from django.utils import timezone
from PIL import Image


def _crop_center(pil_img: Image.Image, target_width: int, target_height: int) -> Image.Image:
    img_width, img_height = pil_img.size
    aspect_ratio_src = img_width / img_height
    aspect_ratio_target = target_width / target_height

    if aspect_ratio_src > aspect_ratio_target:
        new_height = img_height
        new_width = int(aspect_ratio_target * new_height)
    else:
        new_width = img_width
        new_height = int(new_width / aspect_ratio_target)

    left = (img_width - new_width) // 2
    top = (img_height - new_height) // 2
    right = left + new_width
    bottom = top + new_height
    return pil_img.crop((left, top, right, bottom)).resize((target_width, target_height), Image.LANCZOS)


class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, max_length=220)
    description = models.TextField(blank=True)
    thumbnail = models.ImageField(upload_to='projects/thumbnails/', blank=True, null=True)
    cover_image = models.ImageField(upload_to='projects/covers/', blank=True, null=True)
    live_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    featured = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self) -> str:
        return self.title

    def _process_image_field(self, image_field, size=(450, 350)) -> None:
        if not image_field:
            return
        try:
            image_path = image_field.path
        except Exception:
            return

        if not os.path.exists(image_path):
            return

        try:
            with Image.open(image_path) as img:
                img = img.convert('RGB')
                cropped = _crop_center(img, size[0], size[1])
                buffer = BytesIO()
                cropped.save(buffer, format='JPEG', quality=90)
                image_field.save(os.path.basename(image_path), ContentFile(buffer.getvalue()), save=False)
        except Exception:
            return

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self._process_image_field(self.thumbnail, size=(450, 350))
        self._process_image_field(self.cover_image, size=(1200, 600))
        super().save(update_fields=['thumbnail', 'cover_image'])


class Client(models.Model):
    name = models.CharField(max_length=150)
    company = models.CharField(max_length=150, blank=True)
    logo = models.ImageField(upload_to='clients/logos/', blank=True, null=True)
    testimonial = models.TextField(blank=True)
    website = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self) -> str:
        return f"{self.name} ({self.company})" if self.company else self.name


class ContactSubmission(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    mobile = models.CharField(max_length=40, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    handled = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.name} <{self.email}> - {self.created_at.date()}"


class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=120, blank=True)
    subscribed_at = models.DateTimeField(default=timezone.now)
    active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.email
