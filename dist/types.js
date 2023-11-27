"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
const chalk = require('chalk');
class Recipe {
    constructor(title, link, category, difficulty, rating, vegetarian, ingredients) {
        this.title = title;
        this.link = link;
        this.category = category;
        this.difficulty = difficulty;
        this.rating = rating;
        this.vegetarian = vegetarian;
        this.ingredients = ingredients;
    }
    static fromJSON(json) {
        const jsonObject = JSON.parse(json);
        const ingredients = [];
        for (const ingredient of jsonObject.ingredients) {
            ingredients.push({
                name: ingredient.name,
                optional: ingredient.optional
            });
        }
        return new Recipe(jsonObject.title, jsonObject.link, jsonObject.category, jsonObject.difficulty, jsonObject.rating, jsonObject.vegetarian, ingredients);
    }
    toString() {
        let str = "";
        str += chalk.yellow(`Title: `) + `${this.title}\n`;
        str += chalk.yellow(`Link: `) + `${this.link}\n`;
        str += chalk.yellow(`Category: `) + `${this.category}\n`;
        str += chalk.yellow(`Difficulty: `) + `${this.difficulty}\n`;
        str += chalk.yellow(`Rating: `) + `${this.rating}\n`;
        str += chalk.yellow(`Vegetarian: `) + `${this.vegetarian}\n`;
        str += chalk.yellow(`Ingredients: `) + `\n`;
        for (const ingredient of this.ingredients) {
            if (ingredient.optional) {
                str += chalk.gray(`\t${ingredient.name} (optional)\n`);
            }
            else {
                str += `\t${ingredient.name}\n`;
            }
        }
        return str;
    }
}
exports.Recipe = Recipe;
//# sourceMappingURL=types.js.map