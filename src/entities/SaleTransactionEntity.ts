import { SaleTransactionLineItemEntity } from './SaleTransactionLineItemEntity';
export class SaleTransactionEntity {
    totalLineItem: number;
    totalQuantity: number;
    totalAmount: number;
    transactionDateTime: any;
    isTakeaway: boolean;
    saleTransactionLineItemEntities: Array<SaleTransactionLineItemEntity>;
    constructor(){}
}