export type Parent = {
    id: number,
    firstName: string,
    lastName: string
    //status: number

}


export type Item = {
    id: string,
    itemName: string,
    itemPrice: number
    //status: number
}


export type Bid = {
    id: string,
    bidAmount: string,
    date: string,
    itemId: string
    //status: number

}

export type ApiBid = {
    id?: string,
    bidAmount: number,
    date: string,
    itemId: string
}



