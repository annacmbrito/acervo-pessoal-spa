export interface Book {
    id:number
    name: string
    comment: string
    description: string
    rating: number
    status: string
    pages: number,
    author: { id: number, name: string }
    language: { id: number, name: string }
    publisher: { id: number, name: string }
    category: { id: number, name: string }
    subcategory: { id: number, name: string }
}

export interface BookDTO {
    name: string
    description: string
    comment: string
    pages: number
    rating: number
    status: string
    author: string,
    language: string,
    publisher: string,
    category: string,
    subcategory: string,
}