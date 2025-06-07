import datetime
import asyncio
import aiohttp
import traceback

class Github:
    def __init__(self):
        self.base_url = "https://api.github.com"
        # for raw content: application/vnd.github.raw+json
        # for html content: application/vnd.github.html+json
        # for object content: application/vnd.github.object+json

    async def handle_graphql(self, session, access_token, json):
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }
        url = self.base_url + '/graphql'
        async with session.post(url, json=json, headers=headers) as response:
            if response.status == 200:
                return await response.json()
            else:
                print(f"GraphQL request failed with status {response.status}: {await response.text()}")
                return None

    # Currently not used, but can be used for REST API requests
    async def handle_request(self, session, endpoint, access_token, params=None):
        """Make authenticated request to GitHub API"""
        headers = {"Accept": "application/vnd.github+json", "Authorization": f"Bearer {access_token}"}
        url = endpoint if endpoint.startswith("https://api.github.com") else f"{self.base_url}{endpoint}"

        async with session.get(url, headers=headers, params=params) as response:
            if response.status == 200:
                return await response.json()
            else:
                return None
        
    async def get_user_contributions(self, username, access_token, start=None, end=None):
        if not start or not end:
            end = datetime.datetime.now()
            start = end - datetime.timedelta(weeks=48)
        # start = datetime.strptime(start, "%Y-%m-%d")
        # end = datetime.strptime(end, "%Y-%m-%d")

        query = """
        query($username: String!, $from: DateTime!, $to: DateTime!) {
            user(login: $username) {
                contributionsCollection(from: $from, to: $to) {
                    contributionCalendar {
                        weeks {
                            contributionDays {
                                date
                                contributionCount
                                color
                            }
                        }
                    }
                }
            }
        }
        """
        variables = {
            "username": username,
            "from": start.isoformat(),
            "to": end.isoformat()
        }

        async with aiohttp.ClientSession() as session:
            try:
                response = await self.handle_graphql(session, access_token, json={"query": query, "variables": variables})
                if response and 'data' in response:
                    return response['data']['user']['contributionsCollection']['contributionCalendar']['weeks']
            except Exception as e:
                print(f"Async request failed: {e}")
                return None

    async def get_user_commits(self, access_token, github_id):
        query = """
        query($first: Int!, $github_id: ID!, $after: String) {
            viewer {
                repositories(first: $first, after: $after) {
                    nodes {
                        name
                        defaultBranchRef {
                            name
                            target {
                                ... on Commit {
                                    history(first: 5, author: {id: $github_id}) {
                                        edges {
                                            node {
                                                message
                                                committedDate
                                                url,
                                                deletions,
                                                changedFilesIfAvailable,
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    pageInfo {
                        endCursor
                        hasNextPage
                    }
                }
            }
        }
        """
        variables = {
            'first': 100,
            'github_id': github_id,
            'after': None
        }
        has_next_page = True
        
        all_commits = []

        async with aiohttp.ClientSession() as session:
            while has_next_page:
                try:
                    response = await self.handle_graphql(session, access_token, json={"query": query, "variables": variables})
                    has_next_page = response['data']['viewer']['repositories']['pageInfo']['hasNextPage']
                    variables['after'] = response['data']['viewer']['repositories']['pageInfo']['endCursor']
                    for node in response['data']['viewer']['repositories']['nodes']:
                        for edge in node['defaultBranchRef']['target']['history']['edges']:
                            all_commits.append({
                                'repo': node['name'],
                                'branch': node['defaultBranchRef']['name'],
                                'message': edge['node']['message'],
                                'committedDate': edge['node']['committedDate'],
                                'url': edge['node']['url'],
                                'deletions': edge['node'].get('deletions', 0),
                                'changedFilesIfAvailable': edge['node'].get('changedFilesIfAvailable', 0),
                            })
                    
                except KeyError as e:
                    print(f"Malformed response missing expected field: {e}")
                    break
                except Exception as e:
                    print(traceback.format_exc())
                    print(f"Request failed: {e}")
                    break
        
        sorted_commits = sorted(all_commits, key=lambda x: x["committedDate"], reverse=True)
        return sorted_commits[:5]

    async def get_user_info(self, access_token):
        query = """
        query() {
            viewer {
                id
                login
                avatarUrl
                url
            }
        }
        """
        async with aiohttp.ClientSession() as session:
            try:
                response = await self.handle_graphql(session, access_token, json={"query": query})
                if response and 'data' in response:
                    return {
                        'githubId': response['data']['viewer']['id'],
                        'login': response['data']['viewer']['login'],
                        'avatarUrl': response['data']['viewer']['avatarUrl'],
                        'url': response['data']['viewer']['url'],
                    }

            except Exception as e:
                print(f"Async request failed: {e}")
                return None
    
    async def get_user_stats(self, access_token, github_id):
        query = """
        query($first: Int!, $github_id: ID!, $after: String) {
            viewer {
                repositories(first: $first, after: $after) {
                    totalCount
                    nodes {
                        stargazerCount
                        forkCount
                        issues {
                            totalCount
                        }
                        pullRequests {
                            totalCount
                        }
                        defaultBranchRef {
                            target {
                                ... on Commit {
                                    history(author: {id: $github_id}) {
                                        totalCount
                                    }
                                }
                            }
                        }
                        languages(first: 100) {
                            edges {
                                size
                                node {
                                    name
                                    color
                                }
                            }
                        }
                    }
                    pageInfo {
                        endCursor
                        hasNextPage
                    }
                }
            }
        }
        """
        variables = {
            'first': 100,
            'github_id': github_id,
            'after': None
        }
        has_next_page = True
        
        result = {
            'repos_count': 0,
            'stars': 0,
            'forks': 0,
            'commits': 0,
            'pulls': 0,
            'issues': 0,
            'languages': [],
        }

        languages = {}

        async with aiohttp.ClientSession() as session:
            while has_next_page:
                try:
                    response = await self.handle_graphql(session, access_token, json={"query": query, "variables": variables})
                    has_next_page = response['data']['viewer']['repositories']['pageInfo']['hasNextPage']
                    variables['after'] = response['data']['viewer']['repositories']['pageInfo']['endCursor']
                    
                    result['repos_count'] += response['data']['viewer']['repositories']['totalCount']
                    for node in response['data']['viewer']['repositories']['nodes']:
                        result['stars'] += node['stargazerCount']
                        result['forks'] += node['forkCount']
                        result['issues'] += node['issues']['totalCount']
                        result['pulls'] += node['pullRequests']['totalCount']
                        result['commits'] += node['defaultBranchRef']['target']['history']['totalCount']
                        for edge in node['languages']['edges']:
                            if edge['node']['name'] not in languages:
                                languages[edge['node']['name']] = {
                                    'size': edge['size'],
                                    'color': edge['node']['color']
                                }
                            else:
                                languages[edge['node']['name']]['size'] += edge['size']
                except KeyError as e:
                    print(f"Malformed response missing expected field: {e}")
                    break
                except Exception as e:
                    print(traceback.format_exc())
                    print(f"Request failed: {e}")
                    break

        result['languages'] = [{'name': lang, 'size': languages[lang]['size'], 'color': languages[lang]['color']} for lang in languages]
        
        return result

    async def get_repo_info(self, access_token):
        query = """
        query($first: Int!, $after: String) {
            viewer {
                repositories(first: $first, after: $after) {
                    nodes {
                        description
                        forkCount
                        name
                        stargazerCount
                        object(expression: "HEAD:README.md") {
                            ... on Blob {
                                text
                            }
                        }
                    }
                    pageInfo {
                        endCursor
                        hasNextPage
                    }
                }
            }
        }
        """
        variables = {
            'first': 100,
            'after': None
        }
        has_next_page = True
        repos = []
        async with aiohttp.ClientSession() as session:
            while has_next_page:
                try:
                    response = await self.handle_graphql(session, access_token, json={"query": query, "variables": variables})
                    has_next_page = response['data']['viewer']['repositories']['pageInfo']['hasNextPage']
                    variables['after'] = response['data']['viewer']['repositories']['pageInfo']['endCursor']
                    
                    for node in response['data']['viewer']['repositories']['nodes']:
                        repo_info = {
                            'name': node['name'],
                            'description': node.get('description', ''),
                            'forks': node['forkCount'],
                            'stars': node['stargazerCount'],
                            'readme': node['object']['text'] if node['object'] else ''
                        }
                        repos.append(repo_info)
                except KeyError as e:
                    print(f"Malformed response missing expected field: {e}")
                    break
                except Exception as e:
                    print(traceback.format_exc())
                    print(f"Request failed: {e}")
                    break
        return repos

# TESTING CODE
from dotenv import load_dotenv
import os
import json
load_dotenv()
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN', None)
# repos = gh.handle_request("https://api.github.com/repos/facebookresearch/mae_st/commits")
async def main():
    gh = Github()
    # var = await gh.get_user_events("KenesYerassyl", GITHUB_TOKEN, datetime.datetime.now() - datetime.timedelta(days=10), datetime.datetime.now())
    var = await gh.get_repo_info(GITHUB_TOKEN)
    # async with aiohttp.ClientSession() as session:
    #     var = await gh.handle_request(endpoint="/user", access_token=GITHUB_TOKEN, session=session)
    print(var)

if __name__ == '__main__':
    asyncio.run(main())