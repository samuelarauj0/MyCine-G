
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, Star, Plus } from 'lucide-react'
import { Title } from '@/types'
import { api } from '@/lib/api'
import { useAuth } from '@/hooks/useAuth'

export default function TitlesPage() {
  const [titles, setTitles] = useState<Title[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'ALL' | 'MOVIE' | 'SERIES'>('ALL')
  const { user } = useAuth()

  useEffect(() => {
    loadTitles()
  }, [search, filter])

  const loadTitles = async () => {
    try {
      const response = await api.getTitles({
        search: search || undefined,
        type: filter !== 'ALL' ? filter : undefined,
      })
      setTitles(response.data || [])
    } catch (error) {
      console.error('Error loading titles:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredTitles = titles.filter(title => {
    const matchesSearch = search === '' || 
      title.title.toLowerCase().includes(search.toLowerCase()) ||
      title.genre.toLowerCase().includes(search.toLowerCase())
    
    const matchesFilter = filter === 'ALL' || title.type === filter
    
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Explorar Títulos</h1>
          <p className="text-muted-foreground">
            Descubra e avalie filmes e séries incríveis
          </p>
        </div>
        
        {user?.role === 'ADMIN' && (
          <Link href="/admin/titles/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Adicionar Título
            </Button>
          </Link>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar títulos, gêneros..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={filter === 'ALL' ? 'default' : 'outline'}
            onClick={() => setFilter('ALL')}
            size="sm"
          >
            Todos
          </Button>
          <Button
            variant={filter === 'MOVIE' ? 'default' : 'outline'}
            onClick={() => setFilter('MOVIE')}
            size="sm"
          >
            Filmes
          </Button>
          <Button
            variant={filter === 'SERIES' ? 'default' : 'outline'}
            onClick={() => setFilter('SERIES')}
            size="sm"
          >
            Séries
          </Button>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : filteredTitles.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">
              {search ? 'Nenhum título encontrado para sua busca.' : 'Nenhum título disponível.'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTitles.map((title) => (
            <Link key={title.id} href={`/titles/${title.id}`}>
              <Card className="hover:bg-card/80 transition-colors cursor-pointer group h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
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
                          ({title.totalReviews})
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
    </div>
  )
}
