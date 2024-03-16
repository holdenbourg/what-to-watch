import { FollowerModel } from "./follower-model";

export interface UserPostModel {
    postId: string,
    profilePicture: string,
    username: string,
    poster: string,
    caption: string,
    likes: string[],
    taggedUsers: FollowerModel[],
    postDate: string
}