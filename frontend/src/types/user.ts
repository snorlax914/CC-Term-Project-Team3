export type Commit = {
  repo: string,
  branch: string,
  message: string,
  committedDate: string,
  url: string,
  deletions: number,
  changedFilesIfAvailable: number
};

export type Contribution = {
  contributionDays: {
    date: string,
    contributionCount: number,
    color: string
  }
};

export type Language = {
  name: string,
  color: string,
  size: number,
}


export type User = {
    id: number,
    github_id:  string,
    login: string,
    avatar_url: string,
    html_url: URL,
    repos_count:  number,
    stars: number,
    forks: number,
    commit_count: number,
    pulls: number,
    issues: number,
    score: number
    created_at: string,
    commits: Commit[],
    contributions: Contribution[],
    languages: Language[],
}
