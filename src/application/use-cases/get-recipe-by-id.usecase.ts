import { Inject, Injectable } from '@nestjs/common';
import { RecipeRepository } from '../repositories/recipe.repository.interface';

@Injectable()
export class GetRecipeByIdUseCase {
  constructor(
    @Inject('RecipeRepository')
    private readonly recipeRepository: RecipeRepository,
  ) {}

  async execute(id: string): Promise<any> {
    const recipe = await this.recipeRepository.findById(id);

    return recipe ? recipe.toHTTP() : null;
  }
}
