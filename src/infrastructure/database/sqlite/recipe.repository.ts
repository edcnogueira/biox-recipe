// import { Injectable } from '@nestjs/common';
// import { RecipeRepository } from '../../../application/repositories/recipe.repository.interface';
// import { DatabaseService } from './databse.module';
// import { Recipe } from '../../../core/domain/recipe.entity';
//
// @Injectable()
// export class SQLiteRecipeRepository implements RecipeRepository {
//   constructor(private readonly database: DatabaseService) {}
//
//   async create(recipe: Recipe): Promise<Recipe> {
//     await this.database.run(
//       `INSERT INTO recipes (id, title, description, ingredients, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`,
//       [
//         recipe.id,
//         recipe.title,
//         recipe.description,
//         JSON.stringify(recipe.ingredients),
//         recipe.createdAt.toISOString(),
//         recipe.updatedAt.toISOString(),
//       ],
//     );
//     return recipe;
//   }
//
//   async findAll(): Promise<Recipe[]> {
//     const recipes = await this.database.all('SELECT * FROM recipes');
//
//     return recipes.map((r) => this.mapRowToRecipe(r));
//   }
//
//   async findById(id: string): Promise<Recipe | null> {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//     const recipe = await this.database.get(
//       'SELECT * FROM recipes WHERE id = ?',
//       [id],
//     );
//     return recipe ? this.mapRowToRecipe(recipe) : null;
//   }
//
//   private mapRowToRecipe(row: any): Recipe {
//     return new Recipe(
//       // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//       row.id,
//       // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//       row.title,
//       // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//       row.description,
//       // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//       JSON.parse(row.ingredients),
//       // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//       new Date(row.created_at),
//       // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//       new Date(row.updated_at),
//     );
//   }
// }
