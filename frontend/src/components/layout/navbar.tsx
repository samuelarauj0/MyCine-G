
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { apiService } from '@/lib/api'
import { User } from '@/types'
import { Film, Search, User as UserIcon, LogOut, Home, Trophy } from 'lucide-react'

export function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      if (token) {
        const response = await apiService.getProfile()
        setUser(response.data)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    apiService.logout()
    setUser(null)
    router.push('/')
  }

  const getXpProgress = () => {
    if (!user) return 0
    const baseXp = 100
    const levelXp = baseXp * Math.pow(1.5, user.level - 1)
    const currentLevelXp = user.xp - (baseXp * Math.pow(1.5, user.level - 2))
    return (currentLevelXp / levelXp) * 100
  }

  if (isLoading) {
    return (
      <nav className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="h-8 w-32 bg-muted animate-pulse rounded" />
          <div className="flex gap-2">
            <div className="h-8 w-20 bg-muted animate-pulse rounded" />
            <div className="h-8 w-20 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="border-b bg-card/50 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Film className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold gradient-text">MyCine G</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <Home className="h-4 w-4 mr-2" />
              Início
            </Button>
          </Link>
          
          <Link href="/titles">
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Explorar
            </Button>
          </Link>

          <Link href="/leaderboard">
            <Button variant="ghost" size="sm">
              <Trophy className="h-4 w-4 mr-2" />
              Ranking
            </Button>
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              {/* User Stats */}
              <div className="hidden md:flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium">{user.name}</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      Nível {user.level}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {user.rank}
                    </Badge>
                  </div>
                </div>
                <div className="w-20">
                  <Progress value={getXpProgress()} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">
                    {user.xp} XP
                  </div>
                </div>
              </div>

              <Link href="/profile">
                <Button variant="ghost" size="sm">
                  <UserIcon className="h-4 w-4" />
                </Button>
              </Link>

              {user.role === 'ADMIN' && (
                <Link href="/admin">
                  <Button variant="outline" size="sm">
                    Admin
                  </Button>
                </Link>
              )}

              <Button onClick={handleLogout} variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Entrar
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">
                  Cadastrar
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
