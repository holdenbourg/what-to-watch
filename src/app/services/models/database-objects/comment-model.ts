import { ReplyModel } from "./reply-model"

export interface CommentModel {
    postId: string,
    profilePicture: string,
    username: string,
    comment: string,
    likes: string[],
    replies: ReplyModel[],
    commentDate: string
}