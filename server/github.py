from flask import jsonify
import requests

class Github:
    def __init__(self, token=None):
        self.token = token
        self.base_url = "https://api.github.com"
        self.headers = {}
        self.headers["Accept"] = "application/vnd.github+json"
        # for raw content: application/vnd.github.raw+json
        # for html content: application/vnd.github.html+json
        # for object content: application/vnd.github.object+json
        if token:
            self.headers["Authorization"] = f"Bearer {token}"

    def handle_request(self, endpoint, params=None):
        """Make authenticated request to GitHub API"""
        url = endpoint if endpoint.startswith("https://api.github.com") else f"{self.base_url}{endpoint}"
        response = requests.get(url, headers=self.headers, params=params)
        return response

    def handle_response(response):
        """Handle GitHub API response"""
        if response.status_code == 200:
            return jsonify(response.json()), 200
        else:
            return jsonify({
                "error": "GitHub API request failed",
                "status_code": response.status_code,
                "message": response.json().get('message', 'No error message')
            }), response.status_code
    
    def get_all_repos(self, visibility=None, affiliation=None, type=None):
        """Get all repositories for the authenticated user. Requires authentication."""
        params = {}
        if visibility:
            params["visibility"] = visibility
        if affiliation:
            params["affiliation"] = affiliation
        if type and visibility == None and affiliation == None:
            params["type"] = type
        
        response = self.handle_request("/user/repos")
        return response.json()
    
from dotenv import load_dotenv
import os
load_dotenv()
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN', None)
print(GITHUB_TOKEN)
gh = Github(token=GITHUB_TOKEN)
repos = gh.get_all_repos()
for repo in repos:
    resp = gh.handle_request(repo['languages_url'])
    print(resp.json())
