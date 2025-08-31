
export interface User {
  id: string
  name: string
  email: string
  role: 'USER' | 'ADMIN'
  xp: number
  level: number
  rank: string
  createdAt: string
  updatedAt: string
}

export interface Title {
  id: string
  title: string
  description: string
  type: 'MOVIE' | 'SERIES'
  genre: string
  releaseYear: number
  imageUrl?: string
  averageRating: number
  totalReviews: number
  createdAt: string
  updatedAt: string
}

export interface Review {
  id: string
  rating: number
  comment?: string
  userId: string
  titleId: string
  user: User
  title: Title
  createdAt: string
  updatedAt: string
}

export interface Challenge {
  id: string
  title: string
  description: string
  type: 'DAILY' | 'WEEKLY' | 'UNIQUE'
  targetValue: number
  xpReward: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface UserChallenge {
  id: string
  userId: string
  challengeId: string
  currentProgress: number
  isCompleted: boolean
  completedAt?: string
  user: User
  challenge: Challenge
}

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface CreateReviewRequest {
  rating: number
  comment?: string
  titleId: string
}

export interface CreateTitleRequest {
  title: string
  description: string
  type: 'MOVIE' | 'SERIES'
  genre: string
  releaseYear: number
  imageUrl?: string
}

export interface UpdateTitleRequest extends Partial<CreateTitleRequest> {}

export interface LeaderboardEntry {
  user: User
  totalXp: number
  level: number
  rank: string
  position: number
}
