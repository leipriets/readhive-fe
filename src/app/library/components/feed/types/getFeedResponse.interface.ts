import { ArticleInterface } from "../../../data/types/article.interface";

export interface GetFeedResponseInterface {
    articles: ArticleInterface[];
    articlesCount: number;
}