import { CaptionModel } from "./caption-model";
import { CommentModel } from "./comment-model";

export interface UserPostModel {
    postUrl: string,
    caption: CaptionModel,
    postDate: string,
    comments: CommentModel[],
    likes: string[],
    tagged: string[],
    filmType: string
}