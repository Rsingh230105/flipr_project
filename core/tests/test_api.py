from rest_framework.test import APITestCase
from core.models import Subscriber


class SubscriberAPITest(APITestCase):
    def test_subscribe_endpoint(self):
        url = '/api/subscribers/'
        data = {'email': 'new@user.com', 'name': 'New User'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Subscriber.objects.count(), 1)
