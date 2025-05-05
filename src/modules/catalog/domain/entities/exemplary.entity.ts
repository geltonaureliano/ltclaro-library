export enum CopyStatus {
  AVAILABLE = 'AVAILABLE',
  BORROWED = 'BORROWED',
  IN_MAINTENANCE = 'IN_MAINTENANCE',
  LOST = 'LOST',
}

export enum CopyCondition {
  NEW = 'NEW',
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  POOR = 'POOR',
}

export class Copy {
  private _id: string;
  private _code: string;
  private _status: CopyStatus;
  private _condition: CopyCondition;
  private _location: string;
  private _bookId: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: {
    id?: string;
    code: string;
    status: CopyStatus;
    condition: CopyCondition;
    location: string;
    bookId: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this._id = props.id || crypto.randomUUID();
    this._code = props.code;
    this._status = props.status;
    this._condition = props.condition;
    this._location = props.location;
    this._bookId = props.bookId;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
    
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get code(): string {
    return this._code;
  }

  get status(): CopyStatus {
    return this._status;
  }

  get condition(): CopyCondition {
    return this._condition;
  }

  get location(): string {
    return this._location;
  }

  get bookId(): string {
    return this._bookId;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  borrow(): void {
    if (this._status !== CopyStatus.AVAILABLE) {
      throw new Error('Copy is not available for borrowing');
    }
    this._status = CopyStatus.BORROWED;
    this._updatedAt = new Date();
  }

  return(): void {
    if (this._status !== CopyStatus.BORROWED) {
      throw new Error('Copy is not borrowed');
    }
    this._status = CopyStatus.AVAILABLE;
    this._updatedAt = new Date();
  }

  sendToMaintenance(): void {
    this._status = CopyStatus.IN_MAINTENANCE;
    this._updatedAt = new Date();
  }

  markAsLost(): void {
    this._status = CopyStatus.LOST;
    this._updatedAt = new Date();
  }

  updateCondition(condition: CopyCondition): void {
    this._condition = condition;
    this._updatedAt = new Date();
  }

  updateLocation(location: string): void {
    if (!location || location.trim().length === 0) {
      throw new Error('Location cannot be empty');
    }
    this._location = location;
    this._updatedAt = new Date();
  }

  private validate(): void {
    if (!this._code || this._code.trim().length === 0) {
      throw new Error('Code cannot be empty');
    }
    if (!this._location || this._location.trim().length === 0) {
      throw new Error('Location cannot be empty');
    }
    if (!this._bookId) {
      throw new Error('Book ID cannot be empty');
    }
  }

  toJSON() {
    return {
      id: this._id,
      code: this._code,
      status: this._status,
      condition: this._condition,
      location: this._location,
      bookId: this._bookId,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  static fromPersistence(data: any): Copy {
    return new Copy({
      id: data.id,
      code: data.code,
      status: data.status,
      condition: data.condition,
      location: data.location,
      bookId: data.bookId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
} 