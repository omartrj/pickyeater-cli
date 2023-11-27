# PickyEater CLI
A Node.js tool to help you decide what to eat based on available ingredients.

## Description
PickyEater CLI is a command-line tool designed to simplify the decision-making process of what to cook or eat. 
It takes a list of ingredients as input and provides a selection of recipes based on those ingredients. 
It also offers various options such as filtering recipes by vegetarian choices and filtering by recipe category.

## Installation
To use PickyEater CLI, follow these steps:
1. **Clone the repository:**
   ```bash
   git clone https://github.com/omartrj/pickyeater-cli.git
   cd pickyeater-cli
   ```
2. **Install the dependecies:**
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```

## Usage
To execute the tool, use the following command structure:
```bash
pickyeater --input ingredients.txt [options]
```
### Options
- -v, --vegetarian: Only include vegetarian recipes.
- -s, --sort-by <value>: Sort recipes by rating or difficulty (default: rating).
- -f, --filter <value>: Filter recipes by category (default: all).
- -c, --common: Include common ingredients in the recipes.

### Examples
```bash
pickyeater --input ingredients.txt
pickyeater --input ingredients.txt --vegetarian
pickyeater --input ingredients.txt --vegetarian --sort-by rating
pickyeater --input ingredients.txt --vegetarian --sort-by rating --filter primi-piatti
pickyeater --input ingredients.txt --vegetarian --sort-by rating --filter primi-piatti --common
```
