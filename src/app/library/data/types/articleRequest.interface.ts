import { NzUploadFile } from "ng-zorro-antd/upload";

export interface ArticleRequestInterface {
    article: {
        title: string;
        description: string;
        body: string;
        tagList: string[];
        images?: NzUploadFile[];
    }
}