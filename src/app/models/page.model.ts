import { OrderDirection } from "./order-direction.enum"

export interface Page<T> {
    size?:number
    offset?:number
    orderBy?:string
    orderDirection?:OrderDirection
    numberOfElements?:number
    content?:T[]
}

