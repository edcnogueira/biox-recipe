import { Recipe } from '../../core/domain/recipe.entity';

export interface RecipeRepository {
  create(recipe: Recipe): Promise<Recipe>;
  findAll(): Promise<Recipe[]>;
  findById(id: string): Promise<Recipe | null>;
}
