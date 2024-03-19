import { CommentModel } from "./comment-model";
import { FollowerModel } from "./follower-model";
import { UserPostModel } from "./user-post-model";

export interface AccountInformationModel {
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    profilePicture: string,
    bio: string,
    followers: FollowerModel[],
    following: FollowerModel[],
    requests: FollowerModel[],
    blocked: FollowerModel[],
    postIds: string[],
    taggedPostIds: string[],
    archivedPostIds: string[],
    dateJoined: string,
    private: boolean
}