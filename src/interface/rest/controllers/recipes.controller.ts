import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateRecipeUseCase } from '../../../application/use-cases/create-recipe.usecase';
import { ListRecipesUseCase } from '../../../application/use-cases/list-recipes.usecase';
import { GetRecipeByIdUseCase } from '../../../application/use-cases/get-recipe-by-id.usecase';
import { CreateRecipeDto } from '../dtos/create-recipe.dto';
import { z } from 'zod';

const RecipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  ingredients: z.array(z.string()),
});

@Controller('recipes')
export class RecipesController {
  constructor(
    private readonly createRecipeUseCase: CreateRecipeUseCase,
    private readonly listRecipesUseCase: ListRecipesUseCase,
    private readonly getRecipeByIdUseCase: GetRecipeByIdUseCase,
  ) {}

  @Post()
  async create(@Body() createRecipeDto: CreateRecipeDto) {
    try {
      const validatedData = RecipeSchema.parse(createRecipeDto);
      const recipe = await this.createRecipeUseCase.execute(validatedData);
      return recipe.toHTTP();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.map((error) => ({
          path: error.path.join('.'),
          message: error.message,
        }));

        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Validation failed',
            details: formattedErrors,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An unexpected error occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    return this.listRecipesUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.getRecipeByIdUseCase.execute(id);
  }
}
