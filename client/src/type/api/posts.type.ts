export interface IPostsData{
    title: string,
    description: string
}

export interface IPostsRes{
    id_posts?: number,
    title: string,
    description: string,
    userId?: number
}