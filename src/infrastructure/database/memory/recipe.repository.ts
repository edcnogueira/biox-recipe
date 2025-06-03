import { Injectable } from '@nestjs/common';
import { Recipe } from '../../../core/domain/recipe.entity';

@Injectable()
export class InMemoryRecipeRepository {
  private recipes: Recipe[] = [];

  create(recipe: Recipe): Recipe {
    const newRecipe = new Recipe(
      recipe.id,
      recipe.title,
      recipe.description,
      recipe.ingredients,
      recipe.createdAt,
      recipe.updatedAt,
    );

    this.recipes.push(newRecipe);
    return newRecipe;
  }

  findAll(): Recipe[] {
    return [...this.recipes];
  }

  findById(id: string): Recipe | null {
    return this.recipes.find((recipe) => recipe.id === id) || null;
  }
}
