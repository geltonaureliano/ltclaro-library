export class Book {
  private _id: string;
  private _title: string;
  private _author: string;
  private _isbn: string;
  private _publicationYear: number;
  private _publisher: string;
  private _categories: string[];
  private _description?: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: {
    id?: string;
    title: string;
    author: string;
    isbn: string;
    publicationYear: number;
    publisher: string;
    categories: string[];
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this._id = props.id || crypto.randomUUID();
    this._title = props.title;
    this._author = props.author;
    this._isbn = props.isbn;
    this._publicationYear = props.publicationYear;
    this._publisher = props.publisher;
    this._categories = props.categories;
    this._description = props.description;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
    
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get author(): string {
    return this._author;
  }

  get isbn(): string {
    return this._isbn;
  }

  get publicationYear(): number {
    return this._publicationYear;
  }

  get publisher(): string {
    return this._publisher;
  }

  get categories(): string[] {
    return [...this._categories];
  }

  get description(): string | undefined {
    return this._description;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  updateTitle(title: string): void {
    if (!title || title.trim().length === 0) {
      throw new Error('Book title cannot be empty');
    }
    this._title = title;
    this._updatedAt = new Date();
  }

  updateAuthor(author: string): void {
    if (!author || author.trim().length === 0) {
      throw new Error('Book author cannot be empty');
    }
    this._author = author;
    this._updatedAt = new Date();
  }

  updateDescription(description?: string): void {
    this._description = description;
    this._updatedAt = new Date();
  }

  updateCategories(categories: string[]): void {
    this._categories = categories;
    this._updatedAt = new Date();
  }

  private validate(): void {
    if (!this._title || this._title.trim().length === 0) {
      throw new Error('Book title cannot be empty');
    }
    
    if (!this._author || this._author.trim().length === 0) {
      throw new Error('Book author cannot be empty');
    }
    
    if (!this._isbn || this._isbn.trim().length === 0) {
      throw new Error('Book ISBN cannot be empty');
    }
    
    if (!this._publicationYear || this._publicationYear < 0) {
      throw new Error('Publication year must be a valid number');
    }
    
    if (!this._publisher || this._publisher.trim().length === 0) {
      throw new Error('Book publisher cannot be empty');
    }
  }

  toJSON() {
    return {
      id: this._id,
      title: this._title,
      author: this._author,
      isbn: this._isbn,
      publicationYear: this._publicationYear,
      publisher: this._publisher,
      categories: this._categories,
      description: this._description,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  static fromPersistence(data: Book): Book {
    return new Book({
      id: data.id,
      title: data.title,
      author: data.author,
      isbn: data.isbn,
      publicationYear: data.publicationYear,
      publisher: data.publisher,
      categories: data.categories,
      description: data.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
} 