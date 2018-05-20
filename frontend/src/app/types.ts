export type Course = {
    id: string;
    title: string;
    author: string;
    description: string;
    topic: string;
    url: string;
    voteCount: number;
}

export type Query = {
    allCourses: Course[];
}