export interface LikeCommentsRequestInterface {
    liked: boolean | null;
    disliked: boolean | null;
    slug: string;
    commentId: number;
    articleId: number;
}