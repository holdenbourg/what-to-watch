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
    postIds: string[],
    taggedPostIds: string[],
    archivedPostIds: string[],
    private: boolean
}