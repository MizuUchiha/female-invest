export interface Course {
    id: number;
    title: string;
    author: string;
    lessons: number;
    time: string;
    likes: number;
    coverImage: string;
    progress: number;
    liked: boolean;
}