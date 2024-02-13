import { CommentModel } from "./comment-model";

export interface UserPostModel {
    postUrl: string,
    caption: CommentModel,
    postDate: string,
    likes: string[],
    comments: CommentModel[],
    tagged: string[]
}