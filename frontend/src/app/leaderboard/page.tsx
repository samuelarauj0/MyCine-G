
'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Trophy, Medal, Award, Crown } from 'lucide-react'
import { apiService } from '@/lib/api'
import type { User } from '@/types'

interface LeaderboardUser {
  id: string
  name: string
  xp: number
  level: number
  rank: string
  _count: {
    reviews: number
  }
}

const getRankIcon = (position: number) => {
  switch (position) {
    case 1:
      return <Crown className="h-5 w-5 text-yellow-500" />
    case 2:
      return <Trophy className="h-5 w-5 text-gray-400" />
    case 3:
      return <Medal className="h-5 w-5 text-amber-600" />
    default:
      return <Award className="h-4 w-4 text-muted-foreground" />
  }
}

const getRankColor = (rank: string) => {
  const colors = {
    BRONZE: 'bg-amber-700',
    SILVER: 'bg-gray-400',
    GOLD: 'bg-yellow-500',
    PLATINUM: 'bg-cyan-400',
    DIAMOND: 'bg-blue-400',
    MASTER: 'bg-purple-500',
    GRANDMASTER: 'bg-red-500',
    LEGEND: 'bg-gradient-to-r from-purple-500 to-pink-500'
  }
  return colors[rank as keyof typeof colors] || 'bg-gray-500'
}

export default function LeaderboardPage() {
  const { data: leaderboard, isLoading } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const response = await apiService.getLeaderboard(50)
      return response.data
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Ranking de Usuários</h1>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
        <div className="space-y-4">
          {[...Array(10)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 gradient-text">Ranking de Usuários</h1>
        <p className="text-muted-foreground">
          Veja quem são os melhores avaliadores da plataforma
        </p>
      </div>

      {/* Top 3 Podium */}
      {leaderboard && leaderboard.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {leaderboard.slice(0, 3).map((entry, index) => (
            <Card key={entry.id} className={`${index === 0 ? 'md:order-2 ring-2 ring-primary' : index === 1 ? 'md:order-1' : 'md:order-3'}`}>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {getRankIcon(index + 1)}
                </div>
                <h3 className="font-semibold text-lg mb-2">{entry.user.name}</h3>
                <Badge className={`${getRankColor(entry.rank)} text-white mb-3`}>
                  {entry.rank}
                </Badge>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>Nível {user.level}</div>
                  <div>{user.xp.toLocaleString()} XP</div>
                  <div>{user._count.reviews} avaliações</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Full Leaderboard */}
      <div className="space-y-4">
        {leaderboard.map((entry, index) => (
            <Card key={entry.user.id} className={`${index === 0 ? 'md:order-2 ring-2 ring-primary' : index === 1 ? 'md:order-1' : 'md:order-3'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 min-w-[3rem]">
                    <span className="text-lg font-bold text-muted-foreground">
                      #{index + 1}
                    </span>
                    {index < 3 && getRankIcon(index + 1)}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg">{entry.user.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={`${getRankColor(entry.rank)} text-white text-xs`}>
                        {entry.rank}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Nível {entry.level}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <div className="text-lg font-bold text-primary">
                    {entry.totalXp.toLocaleString()} XP
                  </div>
                  <div>{entry.user._count?.reviews || 0} avaliações</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(!leaderboard || leaderboard.length === 0) && (
        <Card>
          <CardContent className="p-8 text-center">
            <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum usuário no ranking</h3>
            <p className="text-muted-foreground">
              Seja o primeiro a avaliar filmes e aparecer no ranking!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
