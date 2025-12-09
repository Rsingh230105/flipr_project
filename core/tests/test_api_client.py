from django.test import TestCase
from rest_framework.test import APIClient

from core.models import Project


class ProjectsApiClientTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        # create a sample project
        Project.objects.create(title="APIClient Project", description="Test project for APIClient")

    def test_projects_endpoint_returns_json(self):
        resp = self.client.get('/api/projects/')
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        # Expect a list (or paginated dict containing 'results')
        if isinstance(data, dict) and 'results' in data:
            items = data['results']
        else:
            items = data
        self.assertGreaterEqual(len(items), 1)
