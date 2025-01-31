import { GetFeedResponseInterface } from "../../../data/types/getFeedResponse.interface";

export interface FeedStateInterface {
    isLoading: boolean;
    error: string | null;
    data: GetFeedResponseInterface | null;
}