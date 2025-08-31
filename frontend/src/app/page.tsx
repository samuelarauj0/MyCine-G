
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Play, TrendingUp, Award } from 'lucide-react'
import { Title } from '@/types'
import { api } from '@/lib/api'

export default function HomePage() {
  const [featuredTitles, setFeaturedTitles] = useState<Title[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFeaturedTitles()
  }, [])

  const loadFeaturedTitles = async () => {
    try {
      const response = await api.getTitles({ limit: 6 })
      setFeaturedTitles(response.data || [])
    } catch (error) {
      console.error('Error loading featured titles:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="h-12 w-64 bg-muted animate-pulse rounded mx-auto" />
          <div className="h-6 w-96 bg-muted animate-pulse rounded mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text">
            MyCine G
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Avalie filmes e séries, ganhe XP, suba de nível e domine o ranking!
          </p>
        </div>
        
        <div className="flex justify-center gap-4">
          <Link href="/titles">
            <Button size="lg" className="gap-2">
              <Play className="h-4 w-4" />
              Explorar Títulos
            </Button>
          </Link>
          <Link href="/leaderboard">
            <Button variant="outline" size="lg" className="gap-2">
              <Trophy className="h-4 w-4" />
              Ver Ranking
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Titles */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Títulos em Destaque</h2>
        </div>
        
        {featuredTitles.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">
                Nenhum título encontrado. Volte mais tarde!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTitles.map((title) => (
              <Link key={title.id} href={`/titles/${title.id}`}>
                <Card className="hover:bg-card/80 transition-colors cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {title.title}
                        </CardTitle>
                        <CardDescription>
                          {title.releaseYear} • {title.genre}
                        </CardDescription>
                      </div>
                      <Badge variant={title.type === 'MOVIE' ? 'default' : 'secondary'}>
                        {title.type === 'MOVIE' ? 'Filme' : 'Série'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {title.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">
                            {title.averageRating.toFixed(1)}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({title.totalReviews} avaliações)
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="bg-card/30 rounded-lg p-8 text-center space-y-4">
        <div className="flex justify-center">
          <Award className="h-12 w-12 text-primary" />
        </div>
        <h3 className="text-2xl font-bold">Comece sua jornada!</h3>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Avalie seus filmes e séries favoritos, complete desafios e climb ao topo do ranking.
        </p>
        <Link href="/auth/register">
          <Button size="lg">
            Criar Conta Grátis
          </Button>
        </Link>
      </section>
    </div>
  )
}
