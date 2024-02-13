from fastapi.testclient import TestClient
from app.main import app
import unittest

class TestRouteCalculate(unittest.TestCase):
    """
    Test cases for the calculate route in the FastAPI application.
    """

    def setUp(self):
        """
        Set up the test client before each test case.
        """
        self.client = TestClient(app)

    def test_validate_bad_content_type(self):
        """
        Test case to validate behavior when content type is not supported.
        """
        headers = {"Content-Type": "text/plain"}
        data = "This is not JSON"
        response = self.client.post("/calculate", data=data, headers=headers)

        self.assertEqual(response.status_code, 415)
        self.assertEqual(response.text,
                         "Unsupported Media Type, use 'application/json'")

    def test_valid_params(self):
        """
        Test case to validate behavior when parameters are valid.
        """
        data = {
                "x0": "10a",
                "y0": "20",
                "z0": "30.45353a",
                "sigma": "0.1234434443847847",
                "rho": "0.25",
                "beta": "0.456",
                "t": "0.23"
        }
        response = self.client.post("/calculate", json=data)

        self.assertEqual(response.status_code, 422)
        self.assertEqual(response.text, "Bad Request")

    def test_missing_params(self):
        """
        Test case to validate behavior when parameters are missing.
        """
        data = {
                "y0": "20",
                "z0": "30.45353a",
                "sigma": "0.1234434443847847",
                "rho": "0.25",
                "beta": "0.456",
                "t": "0.23"
        }
        response = self.client.post("/calculate", json=data)

        self.assertEqual(response.status_code, 422)
        self.assertEqual(response.text, "Bad Request")

    def test_response(self):
        """
        Test case to validate the response of the calculate route.
        """
        data = {
                "x0": "10",
                "y0": "20",
                "z0": "30.45353",
                "sigma": "0.1234434443847847",
                "rho": "0.25",
                "beta": "0.456",
                "t": "0.23"
        }

        # Expected response
        res = {
            "1": [18.646, -189.554, 73.26],
            # Additional expected results truncated for brevity
        }

        response = self.client.post("/calculate", json=data)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), res)

if __name__ == "__main__":
    unittest.main()
