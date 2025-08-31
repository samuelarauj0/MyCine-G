
import axios, { AxiosInstance, AxiosResponse } from 'axios'
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
  Title,
  Review,
  Challenge,
  UserChallenge,
  CreateReviewRequest,
  CreateTitleRequest,
  UpdateTitleRequest,
  LeaderboardEntry
} from '@/types'

class ApiService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Interceptor para adicionar token automaticamente
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Interceptor para lidar com refresh token
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          
          try {
            const refreshToken = localStorage.getItem('refreshToken')
            if (refreshToken) {
              const response = await this.refreshToken(refreshToken)
              localStorage.setItem('accessToken', response.data.accessToken)
              return this.api(originalRequest)
            }
          } catch (refreshError) {
            this.logout()
            window.location.href = '/auth/login'
          }
        }
        
        return Promise.reject(error)
      }
    )
  }

  // Auth
  async login(data: LoginRequest): Promise<AxiosResponse<AuthResponse>> {
    return this.api.post('/auth/login', data)
  }

  async register(data: RegisterRequest): Promise<AxiosResponse<AuthResponse>> {
    return this.api.post('/auth/register', data)
  }

  async refreshToken(refreshToken: string): Promise<AxiosResponse<{ accessToken: string }>> {
    return this.api.post('/auth/refresh', { refreshToken })
  }

  async getProfile(): Promise<AxiosResponse<User>> {
    return this.api.get('/auth/profile')
  }

  logout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  // Titles
  async getTitles(page = 1, limit = 20, search?: string, type?: string): Promise<AxiosResponse<{ titles: Title[], total: number }>> {
    const params = new URLSearchParams()
    params.append('page', page.toString())
    params.append('limit', limit.toString())
    if (search) params.append('search', search)
    if (type) params.append('type', type)
    
    return this.api.get(`/titles?${params.toString()}`)
  }

  async getTitle(id: string): Promise<AxiosResponse<Title>> {
    return this.api.get(`/titles/${id}`)
  }

  async createTitle(data: CreateTitleRequest): Promise<AxiosResponse<Title>> {
    return this.api.post('/titles', data)
  }

  async updateTitle(id: string, data: UpdateTitleRequest): Promise<AxiosResponse<Title>> {
    return this.api.patch(`/titles/${id}`, data)
  }

  async deleteTitle(id: string): Promise<AxiosResponse<void>> {
    return this.api.delete(`/titles/${id}`)
  }

  // Reviews
  async getReviews(titleId: string, page = 1, limit = 10): Promise<AxiosResponse<{ reviews: Review[], total: number }>> {
    return this.api.get(`/reviews/title/${titleId}?page=${page}&limit=${limit}`)
  }

  async createReview(data: CreateReviewRequest): Promise<AxiosResponse<Review>> {
    return this.api.post('/reviews', data)
  }

  async updateReview(id: string, data: Partial<CreateReviewRequest>): Promise<AxiosResponse<Review>> {
    return this.api.patch(`/reviews/${id}`, data)
  }

  async deleteReview(id: string): Promise<AxiosResponse<void>> {
    return this.api.delete(`/reviews/${id}`)
  }

  // Challenges
  async getChallenges(): Promise<AxiosResponse<Challenge[]>> {
    return this.api.get('/challenges')
  }

  async getUserChallenges(): Promise<UserChallenge[]> {
    const response = await this.api.get('/challenges/me')
    return response.data
  }

  async claimChallengeReward(challengeId: string): Promise<AxiosResponse<any>> {
    return this.api.post(`/challenges/${challengeId}/claim`)
  }

  // Gamification
  async getLeaderboard(limit = 50): Promise<AxiosResponse<LeaderboardEntry[]>> {
    return this.api.get(`/gamification/leaderboard?limit=${limit}`)
  }

  async getUserStats(): Promise<AxiosResponse<{ totalReviews: number, totalXp: number, level: number, rank: string }>> {
    return this.api.get('/gamification/stats')
  }
}

export const apiService = new ApiService()
