from flask import jsonify
import asyncio
import aiohttp

class Github:
    def __init__(self):
        self.base_url = "https://api.github.com"
        # for raw content: application/vnd.github.raw+json
        # for html content: application/vnd.github.html+json
        # for object content: application/vnd.github.object+json

    async def handle_request(self, session, endpoint, access_token, params=None):
        """Make authenticated request to GitHub API"""
        headers = {"Accept": "application/vnd.github+json", "Authorization": f"Bearer {access_token}"}
        url = endpoint if endpoint.startswith("https://api.github.com") else f"{self.base_url}{endpoint}"

        async with session.get(url, headers=headers, params=params) as response:
            if response.status == 200:
                return await response.json()
            else:
                return await None
    
    async def get_all_repos(self, session, access_token):
        """Get all repositories for the authenticated user. Requires authentication."""
        repos = []
        page = 1
        while True:
            params = {"page": page, "per_page": 100}
            current_repos = await self.handle_request(session, "/user/repos", access_token, params=params)
            if not current_repos:
                break
            repos.extend(current_repos)
            if len(current_repos) < 100:
                break
            page += 1
        return repos

    async def get_repo_stats(self, session, repo, access_token):
        stats = {
            'commits': 0,
            'pulls': 0,
            'issues': 0,
            'languages': {}
        }
        
        if repo['commits_url']:
            commits_url = repo['commits_url'].split('{')[0]
            commits = await self.handle_request(session, commits_url, access_token)
            stats['commits'] = len(commits) if commits else 0

        if repo['pulls_url']:
            pulls_url = repo['pulls_url'].split('{')[0]
            pulls = await self.handle_request(session, pulls_url, access_token)
            stats['pulls'] = len(pulls) if pulls else 0

        if repo['issues_url']:
            issues_url = repo['issues_url'].split('{')[0] + "?state=all"
            issues = await self.handle_request(session, issues_url, access_token)
            stats['issues'] = len(issues) if issues else 0

        if repo['languages_url']:
            languages = await self.handle_request(session, repo['languages_url'], access_token)
            stats['languages'] = languages if languages else {}

        return stats

    async def get_user_stats(self, access_token):
        async with aiohttp.ClientSession() as session:
            repos = await self.get_all_repos(session, access_token)
            
            tasks = []
            for repo in repos:
                tasks.append(self.get_repo_stats(session, repo, access_token))
            
            all_stats = await asyncio.gather(*tasks)
            
            response = {
                'stars': sum(repo['stargazers_count'] for repo in repos),
                'forks': sum(repo['forks_count'] for repo in repos),
                'total_repos': len(repos),
                'total_commits': 0,
                'total_pulls': 0,
                'total_issues': 0,
                'languages': {}
            }
            
            for stats in all_stats:
                response['total_commits'] += stats['commits']
                response['total_pulls'] += stats['pulls']
                response['total_issues'] += stats['issues']
                
                for lang, bytes in stats['languages'].items():
                    response['languages'][lang] = response['languages'].get(lang, 0) + bytes
            return response
    
    async def get_user_info(self, access_token):
        """Get user information from GitHub API"""
        async with aiohttp.ClientSession() as session:
            user_info = await self.handle_request(session, "/user", access_token)
            if user_info:
                return {
                    'id': user_info['id'],
                    'login': user_info['login'],
                    'avatar_url': user_info['avatar_url'],
                    'html_url': user_info['html_url']
                }
            return None
    
from dotenv import load_dotenv
import os
load_dotenv()
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN', None)
# repos = gh.handle_request("https://api.github.com/repos/facebookresearch/mae_st/commits")

async def main():
    gh = Github()
    async with aiohttp.ClientSession() as session:
        res = await gh.handle_request(session, "/user", GITHUB_TOKEN)
        print(res)

if __name__ == '__main__':
    asyncio.run(main())