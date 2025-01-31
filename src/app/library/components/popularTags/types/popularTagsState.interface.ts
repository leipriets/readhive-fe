import { PopularTagType } from "../../../data/types/popularTag.type";

export interface PopularTagStateInterface {
    isLoading: boolean;
    error: string | null;
    data: PopularTagType[] | null;
}