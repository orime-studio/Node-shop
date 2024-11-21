import { IImage } from "./@types";

export type parasha = {
    author: string;
    image:IImage;
    title: string;
    miniText: string;
    parashPage: parashPage[]
    createdAt: Date

}

export type parashPage = {
    title: string;
   text: string;
}