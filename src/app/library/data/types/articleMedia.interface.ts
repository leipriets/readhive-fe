import {ArticleFiles} from './articleFiles.interface';

export interface ArticleMedia {
  id: number;
  article_id: number;
  files: ArticleFiles[];
  createdAt: string;
  updatedAt: string;
}
