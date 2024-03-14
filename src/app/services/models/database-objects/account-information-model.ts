import { CommentModel } from "./comment-model";
import { FollowerModel } from "./follower-model";
import { UserPostModel } from "./user-post-model";

export interface AccountInformationModel {
    profilePicture: string,
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    bio: string,
    followers: FollowerModel[],
    following: FollowerModel[],
    requests: FollowerModel[],
    blocked: FollowerModel[],
    posts: UserPostModel[],
    postsTaggedIn: UserPostModel[],
    archivedPosts: UserPostModel[],
    private: boolean
}