import { CaptionModel } from "./caption-model";

export interface UserPostModel {
    postUrl: string,
    caption: CaptionModel,
    postDate: string,
    likes: string[],
    tagged: string[]
}