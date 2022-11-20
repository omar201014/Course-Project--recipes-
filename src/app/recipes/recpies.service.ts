import { EventEmitter, Injectable } from "@angular/core";
import { Ingredients } from "../shared/ingredients.component";
import { ShoppingService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()

export class RecipeService{
   recipeSelected = new EventEmitter<Recipe>() 

   private recipes:Recipe[] = [
        new Recipe('Lasagna' , 'Lasagna originated in Italy during the Middle Ages' , '../../../assets/images/image.jpeg' ,[
          new Ingredients('pasta' ,2),
          new Ingredients('grounded meat' ,5),
          new Ingredients('onion',2),
          new Ingredients('cheese',1/4)
        ]) ,
        new Recipe('Fish and chips' , 'is a popular hot dish originated in England consisting of fried fish in crispy batter, served with chips' ,
        '../../../assets/images/Fish_and_chips_blackpool.jpg' ,[
          new Ingredients('haddock Fish' ,1),
          new Ingredients('Potato',2),
          new Ingredients('butter',1/4)
        ]) ,
        new Recipe('Falafel','is a deep-fried ball or patty-shaped fritter in Middle Eastern cuisine (especially in Egyptian cuisines)',
        '../../assets/images/Falafel_balls.jpg' ,[
          new Ingredients('Fava Beans' ,10),
          new Ingredients('parsely',5),
          new Ingredients('coriander',3),
          new Ingredients('garlic',1)
        ])    
      ]

      constructor(private shoppingService:ShoppingService) {}

      getRecipe(){
       return this.recipes.slice();
    }

    onAddToShoppingList(ingredients:Ingredients[]){
      this.shoppingService.addIngrefientsFromRecipe(ingredients)
    }
}

