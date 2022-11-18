import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService{

    recipeSelected = new EventEmitter<Recipe>();

   private recipes:Recipe[] = [
        new Recipe('Lasagna' , 'This the Lasagna Recipe Description' , '../../../assets/images/image.jpeg') ,
        new Recipe('Hamburger' , 'This the Hamburger Recipe Description' , '../../../assets/images/Realistic Fast Food.jpg')     
      ]

      getRecipe(){
       return this.recipes.slice();
    }
}

