const fs = require('fs');
const path = require('path');
import { Recipe } from './types';
import commonIngredients from './constants';

export function getIngredientsFromFile(filename: string): string[] | null {
    try {
        const filePath = path.join(process.cwd(), filename);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return fileContent
            .split('\n')
            .map((ingredient: string) =>
                ingredient
                    .toLowerCase()
                    .trim())
            .filter((ingredient: string) => ingredient !== '');
    } catch (err) {
        console.error('Error reading file. Please make sure the file exists and is readable.');
        return null;
    }
}

function loadRecipes(): Recipe[] {
    const recipes: Recipe[] = [];
    const recipesDir = path.join(__dirname, '..', 'src', 'recipes');
    const files = fs.readdirSync(recipesDir);
    for (const file of files) {
        const filePath = path.join(recipesDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const recipe = Recipe.fromJSON(fileContent);
        recipes.push(recipe);
    }
    return recipes;
}

export function getMatchingRecipes(inputIngredients: string[], vegetarian: boolean, common: boolean): Recipe[] {
    const recipes = loadRecipes();
    const matchingRecipes: Recipe[] = [];
    if (common) {
        // Add common ingredients to the input ingredients
        inputIngredients = [...inputIngredients, ...commonIngredients];
    }
    // Remove duplicates
    inputIngredients = [...new Set(inputIngredients)];
    for (const recipe of recipes) {
        if (vegetarian && !recipe.vegetarian) {
            continue;
        }
        let hasAllIngredients = true;
        for (const ingredient of recipe.ingredients) {
            if (!inputIngredients.includes(ingredient.name.toLowerCase())) {
                if (!ingredient.optional) {
                    hasAllIngredients = false;
                    break;
                }
            }
        }
        if (hasAllIngredients) {
            matchingRecipes.push(recipe);
        }
    }
    return matchingRecipes;
}

export function getRecipesToPrint(recipes: Recipe[], sortBy: string, filter: string): Recipe[] {
    let recipesToPrint = recipes;
    // Filter by category
    if (filter != 'all') {
        recipesToPrint = recipesToPrint.filter((recipe: Recipe) => {
            if (recipe.category !== null) {
                return recipe.category.toLowerCase().replace(/ /g, '-') === filter;
            } else {
                return false;
            }
        });
    }
    // Sort by rating or difficulty
    if (sortBy === 'rating') {
        recipesToPrint = recipesToPrint.sort((a, b) => parseFloat(b.rating.toString()) - parseFloat(a.rating.toString()));
    } else if (sortBy === 'difficulty') {
        const difficulties = ['Molto facile', 'Facile', 'Media', 'Difficile', 'Molto difficile'];
        recipesToPrint = recipesToPrint.sort((a, b) => difficulties.indexOf(String(a.difficulty)) - difficulties.indexOf(String(b.difficulty)));
    }

    return recipesToPrint;
}
