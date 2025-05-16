from flask import Flask, jsonify, request
import requests
from functools import wraps
import os
from dotenv import load_dotenv
from github import Github
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN', None)

load_dotenv()

app = Flask(__name__)
github_manager = Github(token=GITHUB_TOKEN)


def handle_github_response(response):
    """Handle GitHub API response"""
    if response.status_code == 200:
        return jsonify(response.json()), 200
    else:
        return jsonify({
            "error": "GitHub API request failed",
            "status_code": response.status_code,
            "message": response.json().get('message', 'No error message')
        }), response.status_code

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Not found"}), 404

@app.errorhandler(500)
def internal_server_error(error):
    return jsonify({"error": "Internal server error"}), 500

@app.route('/api/repos/<owner>/<repo>/languages', methods=['GET'])
def get_repo_languages(owner, repo):
    response = github_manager.handle_request(f"/repos/{owner}/{repo}/languages")
    return github_manager.handle_response(response)

if __name__ == '__main__':
    app.run(debug=True, port=5000)