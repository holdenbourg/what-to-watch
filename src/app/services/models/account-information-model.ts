export interface AccountInformationModel {
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    bio: string,
    followers: string[],
    following: string[],
    requests: string[],
    private: boolean
}