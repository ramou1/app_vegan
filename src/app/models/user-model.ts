import { PostsModel } from "./posts-model";
import { RecipesModel } from "./recipes-model";

export interface UserModel {
    id: string;
    name?: string;
    username?: string;
    description?: string;
    birth?: string;
    email?: string;
    identify?: string;
    country?: string;
    city?: string;
    background?: string;
    image?: string;
    interests: [
        {
            icon: string;
            color: string;
            description: string;
        }];
    posts: [PostsModel];
    recipes: [RecipesModel];
}