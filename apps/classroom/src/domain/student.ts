import crypto from 'node:crypto';

interface StudentProps {
  name: string;
  email: string;
}

export class Student {
  private _id: string;
  private props: StudentProps;

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  constructor(props: StudentProps, id?: string) {
    this._id = id ?? crypto.randomUUID();
    this.props = props;
  }
}