import crypto from 'node:crypto';
import { Maybe } from '../core/logic/Maybe';

interface CourseProps {
  title: string;
  purchasesProductId: Maybe<string>;
}

export class Course {
  private _id: string;
  private props: CourseProps;

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this.props.title;
  }

  get purchasesProductId(): Maybe<string> {
    return this.props.purchasesProductId;
  }

  constructor(props: CourseProps, id?: string) {
    this._id = id ?? crypto.randomUUID();
    this.props = props;
  }
}