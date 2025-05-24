import { UserProfileInterface } from "../../../containers/userProfile/types/userProfile.interface";

export interface CommentsInterface {
    id: number;
    slug: string;
    body: string;
    author: number;
    user: UserProfileInterface;
    article_id: number;
    like_counts: number;
    dislike_counts: number;
    isLiked: boolean;
    isDisliked: boolean;
    createdAt: string;
    updatedAt: string;
}