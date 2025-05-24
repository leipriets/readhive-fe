import { CommentsInterface } from "../../../data/types/comments.interface";

export interface CommentsStateInterface {
    isLoading: boolean;
    error: string | null;
    comments: CommentsInterface[];
    updatedComment: CommentsInterface | null;
    // articlesCount?: number;
    // allDataLoaded?: boolean;
}