import { FollowerModel } from "./follower-model";

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
    isBlockedBy: FollowerModel[],
    postIds: string[],
    taggedPostIds: string[],
    archivedPostIds: string[],
    dateJoined: string,
    private: boolean
}