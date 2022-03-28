import crypto from 'node:crypto';

interface ProductProps {
  title: string;
}

export class Product {
  private _id: string;
  private props: ProductProps;

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this.props.title;
  }

  constructor(props: ProductProps, id?: string) {
    this._id = id ?? crypto.randomUUID();
    this.props = props;
  }
}