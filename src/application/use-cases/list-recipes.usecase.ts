import { Inject, Injectable } from '@nestjs/common';
import { RecipeRepository } from '../repositories/recipe.repository.interface';

@Injectable()
export class ListRecipesUseCase {
  constructor(
    @Inject('RecipeRepository')
    private readonly recipeRepository: RecipeRepository,
  ) {}

  async execute(): Promise<any[]> {
    const recipes = await this.recipeRepository.findAll();

    return recipes.map((recipe) => recipe.toHTTP());
  }
}
