import { OrderDirection } from "./order-direction.enum"

export interface BookFilterDTO {
    token: string
    rating: string
    publisher_id: string
    category_id: string
    subcategory_id: string
    order_direction: OrderDirection
}