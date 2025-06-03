import { Injectable, Inject } from '@nestjs/common';
import { RecipeRepository } from '../repositories/recipe.repository.interface';
import { Recipe } from '../../core/domain/recipe.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateRecipeUseCase {
  constructor(
    @Inject('RecipeRepository')
    private readonly recipeRepository: RecipeRepository,
  ) {}

  async execute(input: {
    title: string;
    description: string;
    ingredients: string[];
  }): Promise<Recipe> {
    const recipe = new Recipe(
      uuidv4(),
      input.title,
      input.description,
      input.ingredients,
      new Date(),
      new Date(),
    );

    return this.recipeRepository.create(recipe);
  }
}
