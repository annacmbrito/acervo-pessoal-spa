import { Page } from "../models/page.model";

export function convertParamsToPage<T>(data: any): Page<T> {
    return {
        size: data.size,
        offset: data.offset,
        orderBy: data.order_by,
        orderDirection: data.order_direction,
        numberOfElements: data.number_of_elements,
        content: data.content
    };
}

export function convertPageToParam(page: Page<any>): any {
    let param = {} as any;
    if (page.size) {
        param.size = page.size;
    }
    if (page.offset) {
        param.offset = page.offset;
    }
    if (page.orderBy) {
        param.order_by = page.orderBy;
    }
    if (page.orderDirection) {
        param.order_direction = page.orderDirection;
    }
    return param;
}

export function convertFilterToParam(page: any): any {
    let param = {} as any;
    if(page) {
        Object.entries(page).forEach((entry) => {
            if(!!entry[1]) {
               param[entry[0]] = entry[1];
            }
        })
    }
    return param;
}