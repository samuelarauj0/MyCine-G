export declare class CreateTitleDto {
    title: string;
    description: string;
    type: 'MOVIE' | 'SERIES';
    genre?: string;
    director?: string;
    cast?: string;
    releaseDate?: string;
    duration?: string;
    posterUrl?: string;
    trailerUrl?: string;
}
