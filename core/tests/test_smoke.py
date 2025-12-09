from django.test import TestCase, Client


class ApiSmokeTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_projects_list_available(self):
        """Simple smoke test: GET /api/projects/ returns 200"""
        resp = self.client.get('/api/projects/')
        self.assertIn(resp.status_code, (200, 302))
