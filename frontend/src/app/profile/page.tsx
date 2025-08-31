
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  User as UserIcon, 
  Star, 
  Trophy, 
  Calendar,
  Target,
  Award,
  TrendingUp 
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Review, UserChallenge } from '@/types'
import { api } from '@/lib/api'

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth()
  const [userReviews, setUserReviews] = useState<Review[]>([])
  const [userChallenges, setUserChallenges] = useState<UserChallenge[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadUserData()
    }
  }, [user])

  const loadUserData = async () => {
    try {
      // Simulando carregamento dos dados do usuário
      // Em uma implementação real, você faria chamadas para a API
      setUserReviews([])
      setUserChallenges([])
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateProgress = (currentXP: number, level: number) => {
    const currentLevelXP = level > 1 ? (100 * (level - 1) * (level - 2)) / 2 : 0
    const nextLevelXP = (100 * level * (level - 1)) / 2
    const levelXP = nextLevelXP - currentLevelXP
    const progressXP = currentXP - currentLevelXP
    
    return Math.min((progressXP / levelXP) * 100, 100)
  }

  const getNextLevelXP = (level: number) => {
    return (100 * level * (level - 1)) / 2
  }

  if (authLoading || loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Você precisa fazer login para ver seu perfil.
        </p>
      </div>
    )
  }

  const progress = calculateProgress(user.xp, user.level)
  const nextLevelXP = getNextLevelXP(user.level)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Meu Perfil</h1>

      {/* User Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center">
              <UserIcon className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{user.role}</Badge>
                <Badge className="bg-gradient-to-r from-purple-500 to-blue-500">
                  {user.rank}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Nível {user.level}</span>
              <span className="text-sm text-muted-foreground">
                {user.xp} / {nextLevelXP} XP
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold">{userReviews.length}</p>
                <p className="text-sm text-muted-foreground">Avaliações</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-2xl font-bold">{user.xp}</p>
                <p className="text-sm text-muted-foreground">XP Total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-purple-400" />
              <div>
                <p className="text-2xl font-bold">{user.level}</p>
                <p className="text-sm text-muted-foreground">Nível</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-blue-400" />
              <div>
                <p className="text-2xl font-bold">
                  {userChallenges.filter(c => c.isCompleted).length}
                </p>
                <p className="text-sm text-muted-foreground">Desafios</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Atividade Recente</CardTitle>
          <CardDescription>
            Suas últimas avaliações e conquistas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {userReviews.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Você ainda não fez nenhuma avaliação.
              </p>
              <Button className="mt-4" asChild>
                <a href="/titles">Começar a Avaliar</a>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {userReviews.slice(0, 5).map((review) => (
                <div key={review.id} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{review.rating}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{review.title.title}</p>
                    {review.comment && (
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {review.comment}
                      </p>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
