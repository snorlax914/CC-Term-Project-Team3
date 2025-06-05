export interface ReceivedRequest {
  request_id: number,
  from_user : {
    id: number,
    login: string,
    avatar_url: string
  },
  status: string
}

export type ReceivedRequestsResponse = ReceivedRequest[]