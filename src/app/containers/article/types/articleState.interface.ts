import { ArticleInterface } from "../../../library/data/types/article.interface";
import { BackendErrorInterface } from "../../../library/data/types/backendError.interface";

export interface ArticleStateInterface {
    isSubmitting: boolean;
    isLoading: boolean;
    error: string | null;
    validationErrors: BackendErrorInterface | null;
    data: ArticleInterface | null;
}