import { ArticleFiles } from "./articleFiles.interface";
import { ArticleMedia } from "./articleMedia.interface";

export interface ArticleFormValuesInterface {
    title: string;
    description: string;
    body: string;
    tagList: string[];
    images: any;
}