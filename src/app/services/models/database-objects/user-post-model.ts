import { CommentModel } from "./comment-model";

export interface UserPostModel {
    postUrl: string,
    caption: CommentModel,
    tagged: string[]
    postDate: string,
    likes: string[],
    comments: CommentModel[],
}