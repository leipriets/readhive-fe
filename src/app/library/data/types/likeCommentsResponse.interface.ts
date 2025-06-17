import { LikeCommentsInterface } from "./likeComments.interface";

export interface LikeCommentsResponseInterface {
    data: {
        like_counts: number;
        dislike_counts: number;
        like_comments: LikeCommentsInterface;
        slug: string;
    }
}