
'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Trophy, Clock, Star, Calendar, Gift, CheckCircle } from 'lucide-react'
import { api } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'

interface Challenge {
  id: string
  title: string
  description: string
  type: 'DAILY' | 'WEEKLY' | 'UNIQUE'
  targetValue: number
  xpReward: number
  isActive: boolean
  expiresAt?: string
}

interface UserChallenge {
  id: string
  currentValue: number
  isCompleted: boolean
  isRewardClaimed: boolean
  completedAt?: string
  challenge: Challenge
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'DAILY':
      return <Clock className="h-4 w-4" />
    case 'WEEKLY':
      return <Calendar className="h-4 w-4" />
    case 'UNIQUE':
      return <Star className="h-4 w-4" />
    default:
      return <Trophy className="h-4 w-4" />
  }
}

const getTypeBadge = (type: string) => {
  const variants = {
    DAILY: 'bg-green-500',
    WEEKLY: 'bg-blue-500',
    UNIQUE: 'bg-purple-500'
  }
  return variants[type as keyof typeof variants] || 'bg-gray-500'
}

export default function ChallengesPage() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { data: userChallenges, isLoading } = useQuery({
    queryKey: ['challenges', 'me'],
    queryFn: () => api.get<UserChallenge[]>('/challenges/me').then(res => res.data)
  })

  const claimRewardMutation = useMutation({
    mutationFn: (challengeId: string) => 
      api.post(`/challenges/${challengeId}/claim`),
    onSuccess: (_, challengeId) => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] })
      queryClient.invalidateQueries({ queryKey: ['gamification', 'me'] })
      toast({
        title: "Recompensa coletada!",
        description: "XP adicionado ao seu perfil.",
      })
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível coletar a recompensa.",
        variant: "destructive"
      })
    }
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Desafios</h1>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                  <div className="h-2 bg-muted rounded w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const groupedChallenges = {
    DAILY: userChallenges?.filter(uc => uc.challenge.type === 'DAILY') || [],
    WEEKLY: userChallenges?.filter(uc => uc.challenge.type === 'WEEKLY') || [],
    UNIQUE: userChallenges?.filter(uc => uc.challenge.type === 'UNIQUE') || []
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 gradient-text">Desafios</h1>
        <p className="text-muted-foreground">
          Complete desafios para ganhar XP extra e subir de nível
        </p>
      </div>

      {/* Daily Challenges */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Clock className="h-6 w-6 text-green-500" />
          Desafios Diários
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groupedChallenges.DAILY.map((userChallenge) => (
            <ChallengeCard 
              key={userChallenge.id} 
              userChallenge={userChallenge}
              onClaimReward={() => claimRewardMutation.mutate(userChallenge.challenge.id)}
              isClaimingReward={claimRewardMutation.isLoading}
            />
          ))}
        </div>
      </section>

      {/* Weekly Challenges */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Calendar className="h-6 w-6 text-blue-500" />
          Desafios Semanais
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groupedChallenges.WEEKLY.map((userChallenge) => (
            <ChallengeCard 
              key={userChallenge.id} 
              userChallenge={userChallenge}
              onClaimReward={() => claimRewardMutation.mutate(userChallenge.challenge.id)}
              isClaimingReward={claimRewardMutation.isLoading}
            />
          ))}
        </div>
      </section>

      {/* Unique Challenges */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Star className="h-6 w-6 text-purple-500" />
          Desafios Únicos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groupedChallenges.UNIQUE.map((userChallenge) => (
            <ChallengeCard 
              key={userChallenge.id} 
              userChallenge={userChallenge}
              onClaimReward={() => claimRewardMutation.mutate(userChallenge.challenge.id)}
              isClaimingReward={claimRewardMutation.isLoading}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

interface ChallengeCardProps {
  userChallenge: UserChallenge
  onClaimReward: () => void
  isClaimingReward: boolean
}

function ChallengeCard({ userChallenge, onClaimReward, isClaimingReward }: ChallengeCardProps) {
  const { challenge } = userChallenge
  const progress = Math.min((userChallenge.currentValue / challenge.targetValue) * 100, 100)
  const isCompleted = userChallenge.isCompleted
  const canClaim = isCompleted && !userChallenge.isRewardClaimed

  return (
    <Card className={`${isCompleted ? 'ring-2 ring-primary' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getTypeIcon(challenge.type)}
            <Badge className={`${getTypeBadge(challenge.type)} text-white text-xs`}>
              {challenge.type}
            </Badge>
          </div>
          <Badge variant="outline" className="text-xs">
            +{challenge.xpReward} XP
          </Badge>
        </div>
        <CardTitle className="text-lg">{challenge.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {challenge.description}
        </p>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Progresso</span>
            <span>{userChallenge.currentValue}/{challenge.targetValue}</span>
          </div>
          <Progress value={progress} className="h-2" />
          
          {challenge.expiresAt && (
            <div className="text-xs text-muted-foreground">
              Expira em: {new Date(challenge.expiresAt).toLocaleDateString()}
            </div>
          )}

          {canClaim && (
            <Button 
              onClick={onClaimReward}
              disabled={isClaimingReward}
              className="w-full gap-2"
            >
              <Gift className="h-4 w-4" />
              Coletar Recompensa
            </Button>
          )}

          {userChallenge.isRewardClaimed && (
            <div className="flex items-center justify-center gap-2 text-sm text-green-500">
              <CheckCircle className="h-4 w-4" />
              Recompensa coletada
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
