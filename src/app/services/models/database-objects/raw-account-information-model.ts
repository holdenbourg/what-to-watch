export interface RawAccountInformationModel {
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    profilePicture: string,
    bio: string,
    followers: string[],
    following: string[],
    requests: string[],
    blocked: string[],
    isBlockedBy: string[],
    postIds: string[],
    taggedPostIds: string[],
    archivedPostIds: string[],
    dateJoined: string,
    private: boolean
}