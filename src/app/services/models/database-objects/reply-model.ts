export interface ReplyModel {
    commentId: string,
    replyId: string,
    profilePicture: string,
    username: string,
    replyingToUsername: string,
    comment: string,
    likes: string[],
    commentDate: string
}