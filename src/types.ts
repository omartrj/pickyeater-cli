const chalk = require('chalk');

class Recipe {

    public title: string;
    public link: string;
    public category: string;
    public difficulty: string;
    public rating: number;
    public vegetarian: boolean;
    public ingredients: Ingredient[];

    constructor(
        title: string,
        link: string,
        category: string,
        difficulty: string,
        rating: number,
        vegetarian: boolean,
        ingredients: Ingredient[],
    ) {
        this.title = title;
        this.link = link;
        this.category = category;
        this.difficulty = difficulty;
        this.rating = rating;
        this.vegetarian = vegetarian;
        this.ingredients = ingredients;
    }

    public static fromJSON(json: any): Recipe {
        const jsonObject = JSON.parse(json);
        const ingredients: Ingredient[] = [];
        for (const ingredient of jsonObject.ingredients) {
            ingredients.push({
                name: ingredient.name,
                optional: ingredient.optional
            });
        }
        return new Recipe(
            jsonObject.title,
            jsonObject.link,
            jsonObject.category,
            jsonObject.difficulty,
            jsonObject.rating,
            jsonObject.vegetarian,
            ingredients,
        );
    }

    public toString(): string {
        let str: string = "";
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
            } else {
                str += `\t${ingredient.name}\n`;
            }
        }
        return str;
    }
}

interface Ingredient {
    name: string;
    optional: boolean;
}

export { Recipe };