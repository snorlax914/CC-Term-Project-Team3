export const userData = {
    login: "honggildong",
    name: "홍길동",
    avatar_url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXItaWNvbiBsdWNpZGUtdXNlciI+PHBhdGggZD0iTTE5IDIxdi0yYTQgNCAwIDAgMC00LTRIOWE0IDQgMCAwIDAtNCA0djIiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiLz48L3N2Zz4=",
    bio: "소개 소개",
    location: "서울, 대한민국",
    blog: "https://myblog.dev",
    commits: 100,
    PRs: 34,
    issue: 16,
    contributes: 9,
    score: 45678,
    nextLevelScore: 50000,
    stats: {
      totalStars: 2847,
      totalForks: 892,
      totalCommits: 3456,
      contributedRepos: 89,
      streak: 45,
    },
    character: {
      name: "코드 마스터",
      level: 23,
      emoji: "🧙‍♂️",
      description: "강력한 코딩 능력을 가진 마법사입니다. 복잡한 알고리즘도 척척 해결해냅니다.",
      skills: {
        coding: 85,
        collaboration: 72,
        innovation: 90,
      },
    },
    achievements: [
      { name: "Early Adopter", description: "GitHub 초기 사용자", icon: "🏆" },
      { name: "Star Gazer", description: "1000개 이상 스타 획득", icon: "⭐" },
      { name: "Collaborator", description: "50개 이상 저장소 기여", icon: "🤝" },
      { name: "Commit Master", description: "1000회 이상 커밋", icon: "💻" },
    ],
    recentCommits: [
      {
        sha: "a1b2c3d",
        message: "feat: Add user authentication with JWT tokens",
        repo: "awesome-project",
        branch: "main",
        date: "2시간 전",
        additions: 45,
        deletions: 12,
        files: 3,
      },
      {
        sha: "e4f5g6h",
        message: "fix: Resolve memory leak in data processing module",
        repo: "react-components",
        branch: "develop",
        date: "5시간 전",
        additions: 8,
        deletions: 15,
        files: 2,
      },
      {
        sha: "i7j8k9l",
        message: "docs: Update README with installation instructions",
        repo: "python-utils",
        branch: "main",
        date: "1일 전",
        additions: 23,
        deletions: 5,
        files: 1,
      },
      {
        sha: "m0n1o2p",
        message: "refactor: Optimize database query performance",
        repo: "awesome-project",
        branch: "feature/optimization",
        date: "2일 전",
        additions: 67,
        deletions: 34,
        files: 5,
      },
      {
        sha: "q3r4s5t",
        message: "style: Apply consistent code formatting",
        repo: "react-components",
        branch: "main",
        date: "3일 전",
        additions: 12,
        deletions: 8,
        files: 7,
      },
    ],
  }

export const mockReceivedRequests =
  [
    {
      "request_id": 42,
      "from_user": {
        "id": 2,
        "login": "bob",
        "avatar_url": "https://avatars.githubusercontent.com/u/1002?v=4"
      },
      "status": "pending"
    },
    {
      "request_id": 43,
      "from_user": {
        "id": 3,
        "login": "alice",
        "avatar_url": "https://avatars.githubusercontent.com/u/1003?v=4"
      },
      "status": "accepted"
    },
    {
      "request_id": 44,
      "from_user": {
        "id": 4,
        "login": "charlie",
        "avatar_url": "https://avatars.githubusercontent.com/u/1004?v=4"
      },
      "status": "rejected"
    },
    {
      "request_id": 45,
      "from_user": {
        "id": 5,
        "login": "dave",
        "avatar_url": "https://avatars.githubusercontent.com/u/1005?v=4"
      },
      "status": "pending"
    },
    {
      "request_id": 46,
      "from_user": {
        "id": 6,
        "login": "eve",
        "avatar_url": "https://avatars.githubusercontent.com/u/1006?v=4"
      },
      "status": "accepted"
    }
  ]