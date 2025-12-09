from django.test import TestCase
from core.models import Subscriber, ContactSubmission, Client, Project


class ModelSmokeTests(TestCase):
    def test_subscriber_creation(self):
        s = Subscriber.objects.create(email='test@example.com', name='Ravi')
        self.assertEqual(str(s), 'test@example.com')
        self.assertTrue(s.active)

    def test_contact_submission(self):
        c = ContactSubmission.objects.create(name='Ana', email='ana@example.com', message='Hello')
        self.assertIn('Ana', str(c))

    def test_client_and_project(self):
        client = Client.objects.create(name='Acme', company='ACME Ltd.')
        project = Project.objects.create(title='Site', slug='site-1', description='desc')
        self.assertTrue(str(client).startswith('Acme'))
        self.assertEqual(project.slug, 'site-1')
