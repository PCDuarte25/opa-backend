export class CreateOrderDto {
    totalValue: number;
    status: OrderStatus;
    tableId: number;
    productId: number;
    personIds: number[];
    restaurantId: number;
}

export enum OrderStatus {
    EmAndamento = 1,
    Concluido = 2,
    Cancelado = 3,
}