export interface RecipesModel {
    id?: number;
    creator_id?: number;
    creator?: string;
    creator_image?: string;
    registerDate?: string;
    images?: [];
    title?: string;
    instructions?: string;
    ingredients?: [{}];
    cookTime?: string;
    servings?: number;
    calories?: number;
    liked?: boolean;
    favorited?: boolean;
    likes?: [{}];
    comments?: [{}];
}