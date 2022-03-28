import crypto from 'node:crypto';

interface PurchaseProps {
  customerId: string;
  productId: string; 
  createdAt: Date;
}

export class Purchase {
  private _id: string;
  private props: PurchaseProps;

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this.props.customerId;
  }

  get productId(): string {
    return this.props.productId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  constructor(props: PurchaseProps, id?: string) {
    this._id = id ?? crypto.randomUUID();
    this.props = props;
  }
}