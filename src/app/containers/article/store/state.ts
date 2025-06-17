import { ArticleStateInterface } from "../types/articleState.interface";

export const initialState: ArticleStateInterface = {
  isSubmitting: false,
  isLoading: false,
  error: null,
  validationErrors: null,
  data: null,
};