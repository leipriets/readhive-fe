import { ArticleInterface } from "../../../data/types/article.interface";
import { GetFeedResponseInterface } from "../../../data/types/getFeedResponse.interface";

export interface FeedStateInterface {
    isLoading: boolean;
    error: string | null;
    articles: ArticleInterface[];
    articlesCount: number;
    allDataLoaded: boolean;
}