"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecipesToPrint = exports.getMatchingRecipes = exports.getIngredientsFromFile = void 0;
const fs = require('fs');
const path = require('path');
const types_1 = require("./types");
const constants_1 = __importDefault(require("./constants"));
function getIngredientsFromFile(filename) {
    try {
        const filePath = path.join(process.cwd(), filename);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return fileContent
            .split('\n')
            .map((ingredient) => ingredient
            .toLowerCase()
            .trim())
            .filter((ingredient) => ingredient !== '');
    }
    catch (err) {
        console.error('Error reading file. Please make sure the file exists and is readable.');
        return null;
    }
}
exports.getIngredientsFromFile = getIngredientsFromFile;
function loadRecipes() {
    const recipes = [];
    const recipesDir = path.join(__dirname, '..', 'src', 'recipes');
    const files = fs.readdirSync(recipesDir);
    for (const file of files) {
        const filePath = path.join(recipesDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const recipe = types_1.Recipe.fromJSON(fileContent);
        recipes.push(recipe);
    }
    return recipes;
}
function getMatchingRecipes(inputIngredients, vegetarian, common) {
    const recipes = loadRecipes();
    const matchingRecipes = [];
    if (common) {
        // Add common ingredients to the input ingredients
        inputIngredients = [...inputIngredients, ...constants_1.default];
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
exports.getMatchingRecipes = getMatchingRecipes;
function getRecipesToPrint(recipes, sortBy, filter) {
    let recipesToPrint = recipes;
    // Filter by category
    if (filter != 'all') {
        recipesToPrint = recipesToPrint.filter((recipe) => {
            if (recipe.category !== null) {
                return recipe.category.toLowerCase().replace(/ /g, '-') === filter;
            }
            else {
                return false;
            }
        });
    }
    // Sort by rating or difficulty
    if (sortBy === 'rating') {
        recipesToPrint = recipesToPrint.sort((a, b) => parseFloat(b.rating.toString()) - parseFloat(a.rating.toString()));
    }
    else if (sortBy === 'difficulty') {
        const difficulties = ['Molto facile', 'Facile', 'Media', 'Difficile', 'Molto difficile'];
        recipesToPrint = recipesToPrint.sort((a, b) => difficulties.indexOf(String(a.difficulty)) - difficulties.indexOf(String(b.difficulty)));
    }
    return recipesToPrint;
}
exports.getRecipesToPrint = getRecipesToPrint;
//# sourceMappingURL=utils.js.map