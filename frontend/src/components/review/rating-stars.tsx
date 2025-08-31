
'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingStarsProps {
  rating: number
  onRatingChange?: (rating: number) => void
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function RatingStars({ 
  rating, 
  onRatingChange, 
  readonly = false,
  size = 'md' 
}: RatingStarsProps) {
  const [hoveredRating, setHoveredRating] = useState(0)

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  }

  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1
    const isActive = hoveredRating ? starValue <= hoveredRating : starValue <= rating
    
    return (
      <button
        key={index}
        type="button"
        disabled={readonly}
        onClick={() => !readonly && onRatingChange?.(starValue)}
        onMouseEnter={() => !readonly && setHoveredRating(starValue)}
        onMouseLeave={() => !readonly && setHoveredRating(0)}
        className={cn(
          'transition-colors',
          !readonly && 'hover:scale-110 cursor-pointer',
          readonly && 'cursor-default'
        )}
      >
        <Star
          className={cn(
            sizeClasses[size],
            isActive
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-muted-foreground'
          )}
        />
      </button>
    )
  })

  return (
    <div className="flex items-center gap-1">
      {stars}
    </div>
  )
}
