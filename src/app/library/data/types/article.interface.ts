import { ArticleMedia } from "./articleMedia.interface";
import { CommentsInterface } from "./comments.interface";
import { PopularTagType } from "./popularTag.type";
import { ProfileInterface } from "./profile.interface";



export interface ArticleInterface {
    id: number;
    body: string;
    createdAt: string;
    description: string;
    favorited: boolean;
    favoritesCount: number;
    slug: string;
    tagList: PopularTagType[];
    comments: CommentsInterface[];
    commentsCount: number;
    title: string;
    updatedAt: string;
    author: ProfileInterface;
    article_media: any;
}