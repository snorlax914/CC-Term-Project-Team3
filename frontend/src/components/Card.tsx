import styled from "@emotion/styled"

export const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`

export const CardHeader = styled.div`
  padding: 1.5rem 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
`

export const CardDescription = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`

export const CardContent = styled.div`
  padding: 1.5rem;
`