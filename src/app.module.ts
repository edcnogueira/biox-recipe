import { Module } from '@nestjs/common';

import { RecipesController } from './interface/rest/controllers/recipes.controller';

import { CreateRecipeUseCase } from './application/use-cases/create-recipe.usecase';
import { ListRecipesUseCase } from './application/use-cases/list-recipes.usecase';
import { GetRecipeByIdUseCase } from './application/use-cases/get-recipe-by-id.usecase';
import { InMemoryRecipeRepository } from './infrastructure/database/memory/recipe.repository';

@Module({
  imports: [],
  controllers: [RecipesController],
  providers: [
    {
      provide: 'RecipeRepository',
      useClass: InMemoryRecipeRepository,
    },
    CreateRecipeUseCase,
    ListRecipesUseCase,
    GetRecipeByIdUseCase,
  ],
})
export class AppModule {}
