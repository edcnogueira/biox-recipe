export class Recipe {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public ingredients: string[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
  toHTTP() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      ingredients: this.ingredients,
      createdAt: this.createdAt.toISOString(),
    };
  }
}
