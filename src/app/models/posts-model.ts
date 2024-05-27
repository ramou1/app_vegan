export interface PostsModel {
    post_id?: string;
    creator_id?: string;
    creator?: string;
    creator_image?: string;
    // user: {
    //     id: string;
    //     name: string;
    //     image: string;
    // };
    text: string;
    image: string;
    likes: number;
    comments: number;
    liked: boolean;
    registerDate: string;
}