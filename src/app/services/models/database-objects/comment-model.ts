import { ReplyModel } from "./reply-model"

export interface CommentModel {
    postId: string,
    commentId: string,
    profilePicture: string,
    username: string,
    comment: string,
    likes: string[],
    commentDate: string
}