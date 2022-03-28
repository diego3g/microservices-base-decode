import crypto from 'node:crypto';

interface CustomerProps {
  name: string;
  email: string;
}

export class Customer {
  private _id: string;
  private props: CustomerProps;

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  constructor(props: CustomerProps, id?: string) {
    this._id = id ?? crypto.randomUUID();
    this.props = props;
  }
}