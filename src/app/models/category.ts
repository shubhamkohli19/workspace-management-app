export interface Category {
    id: number;
    categoryName: string;
    description: string;
    rating: number;
    ratingWord: string;
    highlights: string;
    image: string;
    highlightsArray?: string[];
}