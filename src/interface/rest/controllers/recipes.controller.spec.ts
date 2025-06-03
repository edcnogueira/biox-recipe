import { Test, TestingModule } from '@nestjs/testing';
import { RecipesController } from './recipes.controller';
import { CreateRecipeUseCase } from '../../../application/use-cases/create-recipe.usecase';
import { ListRecipesUseCase } from '../../../application/use-cases/list-recipes.usecase';
import { GetRecipeByIdUseCase } from '../../../application/use-cases/get-recipe-by-id.usecase';
import { CreateRecipeDto } from '../dtos/create-recipe.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

const mockCreateRecipeUseCase = {
  execute: jest.fn(),
};

const mockListRecipesUseCase = {
  execute: jest.fn(),
};

const mockGetRecipeByIdUseCase = {
  execute: jest.fn(),
};

describe('RecipesController', () => {
  let controller: RecipesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipesController],
      providers: [
        { provide: CreateRecipeUseCase, useValue: mockCreateRecipeUseCase },
        { provide: ListRecipesUseCase, useValue: mockListRecipesUseCase },
        { provide: GetRecipeByIdUseCase, useValue: mockGetRecipeByIdUseCase },
      ],
    }).compile();

    controller = module.get<RecipesController>(RecipesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a recipe successfully', async () => {
      const createRecipeDto: CreateRecipeDto = {
        title: 'Test Recipe',
        description: 'Test Description',
        ingredients: ['Ingredient 1', 'Ingredient 2'],
      };

      const mockId = uuidv4();

      const mockRecipe = {
        id: mockId,
        ...createRecipeDto,
        toHTTP: () => ({ id: mockId, ...createRecipeDto }),
      };

      mockCreateRecipeUseCase.execute.mockResolvedValue(mockRecipe);

      const result = await controller.create(createRecipeDto);

      expect(mockCreateRecipeUseCase.execute).toHaveBeenCalledWith(
        createRecipeDto,
      );
      expect(result).toEqual(mockRecipe.toHTTP());
    });

    it('should throw HttpException on validation error', async () => {
      const invalidDto: any = {
        title: 'Test Recipe',
        ingredients: ['Ingredient 1'],
      };

      await expect(controller.create(invalidDto)).rejects.toThrow(
        HttpException,
      );
      try {
        await controller.create(invalidDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        const response = error.getResponse();
        expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        expect(response.error).toBe('Validation failed');
        expect(response.details).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              path: 'description',
              message: 'Required',
            }),
          ]),
        );
      }
    });

    it('should throw HttpException on unexpected error during creation', async () => {
      const createRecipeDto: CreateRecipeDto = {
        title: 'Test Recipe',
        description: 'Test Description',
        ingredients: ['Ingredient 1', 'Ingredient 2'],
      };

      mockCreateRecipeUseCase.execute.mockRejectedValue(
        new Error('Unexpected DB error'),
      );

      await expect(controller.create(createRecipeDto)).rejects.toThrow(
        HttpException,
      );
      try {
        await controller.create(createRecipeDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        const response = error.getResponse();
        expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(response.error).toBe('An unexpected error occurred');
      }
    });
  });

  describe('findAll', () => {
    it('should return an array of recipes', async () => {
      const mockRecipes = [
        { id: '1', title: 'Recipe 1' },
        { id: '2', title: 'Recipe 2' },
      ];
      mockListRecipesUseCase.execute.mockResolvedValue(mockRecipes);

      const result = await controller.findAll();

      expect(mockListRecipesUseCase.execute).toHaveBeenCalled();
      expect(result).toEqual(mockRecipes);
    });
  });

  describe('findOne', () => {
    it('should return a single recipe', async () => {
      const recipeId = '1';
      const mockRecipe = { id: recipeId, title: 'Test Recipe' };
      mockGetRecipeByIdUseCase.execute.mockResolvedValue(mockRecipe);

      const result = await controller.findOne(recipeId);

      expect(mockGetRecipeByIdUseCase.execute).toHaveBeenCalledWith(recipeId);
      expect(result).toEqual(mockRecipe);
    });
  });
});
