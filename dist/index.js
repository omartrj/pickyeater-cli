#!/usr/bin/env node
"use strict";
const { Command } = require('commander');
const figlet = require('figlet');
const chalk = require('chalk');
const emoji = require('node-emoji');
const { getIngredientsFromFile, getMatchingRecipes, getRecipesToPrint } = require('./utils');
const title = "PickyEater CLI";
const program = new Command();
program
    .name('pickyeater')
    .description('A Node.js tool to help you decide what to eat')
    .version('1.0.0');
program
    .option('-i, --input <filename>', 'input file containing the list of ingredients (required)')
    .option('-v, --vegetarian', 'only include vegetarian recipes', false)
    .option('-s, --sort-by <value>', 'sort by rating or difficulty', 'rating')
    .option('-f, --filter <value>', 'filter by category', 'all')
    .option('-c, --common', 'include common ingredients', false);
program.outputHelp = function () {
    //Add title
    console.log(chalk.rgb(255, 127, 0).bold(figlet.textSync(title, {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    })));
    // Add description
    console.log(this.helpInformation());
    // Add examples
    printExamples();
    return this;
};
program.parse(process.argv);
const options = program.opts();
// --input (required)
if (options.input) {
    // --vegetarian (optional)
    if (options.vegetarian) {
        console.log(chalk.green("Showing only vegetarian recipes! ") + emoji.get('broccoli'));
    }
    if (options.common) {
        console.log(chalk.yellow("Including common ingredients! ") + emoji.get('tomato'));
    }
    // --sort-by (optional)
    if (options.sortBy !== 'rating' && options.sortBy !== 'difficulty') {
        console.log(chalk.red(options.sortBy + ' is NOT a valid option! ') + emoji.get('confused'));
        options.sortBy = 'rating';
    }
    // --filter (optional)
    //{'Secondi piatti', 'Piatti Unici', 'Antipasti', None, 'Salse e Sughi', 'Primi piatti', 'Lievitati', 'Contorni', 'Torte salate', 'Dolci'}
    if (options.filter !== 'all' && options.filter !== 'secondi-piatti' && options.filter !== 'piatti-unici' && options.filter !== 'antipasti' && options.filter !== 'salse-e-sughi' && options.filter !== 'primi-piatti' && options.filter !== 'lievitati' && options.filter !== 'contorni' && options.filter !== 'torte-salate' && options.filter !== 'dolci') {
        console.log(chalk.red(options.filter + ' is NOT a valid option! ') + emoji.get('confused'));
        options.filter = 'all';
    }
    const ingredients = getIngredientsFromFile(options.input);
    if (ingredients) {
        const recipes = getMatchingRecipes(ingredients, options.vegetarian, options.common);
        const recipesToPrint = getRecipesToPrint(recipes, options.sortBy, options.filter);
        if (recipesToPrint.length === 0) {
            console.log(chalk.red('No recipes found! ') + emoji.get('sob'));
        }
        else {
            //Print the sorting and filtering options
            console.log('Sorting by ' + chalk.magenta(options.sortBy) + ' ' + emoji.get('star'));
            console.log('Filtering by ' + chalk.magenta(options.filter) + ' ' + emoji.get('knife_fork_plate'));
            console.log('Found ' + chalk.green(recipesToPrint.length) + ' recipes! ' + emoji.get('tada') + '\n');
            for (const recipe of recipesToPrint) {
                console.log(recipe.toString());
            }
        }
    }
}
else {
    // No options provided
    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
    // Missing required option --input but other options provided
    else {
        console.log(chalk.red('Missing required option --input! ') + emoji.get('confused'));
        printExamples();
    }
}
function printExamples() {
    console.log('Examples:');
    console.log('  $ pickyeater --input ingredients.txt');
    console.log('  $ pickyeater --input ingredients.txt --vegetarian');
    console.log('  $ pickyeater --input ingredients.txt --vegetarian --sort-by rating');
    console.log('  $ pickyeater --input ingredients.txt --vegetarian --sort-by rating --filter primi-piatti');
    console.log('  $ pickyeater --input ingredients.txt --vegetarian --sort-by rating --filter primi-piatti --common');
}
//# sourceMappingURL=index.js.map