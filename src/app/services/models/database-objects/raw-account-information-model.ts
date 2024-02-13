export interface RawAccountInformationModel {
    profilePicture: string,
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    bio: string,
    followers: string[],
    following: string[],
    requests: string[],
    blocked: string[],
    posts: string[],
    postsTaggedIn: string[],
    private: boolean
}