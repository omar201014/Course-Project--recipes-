import { Injectable } from "@angular/core";
import { Subject } from "rxjs-compat/Subject";
import { Ingredients } from "../shared/ingredients.component";
import { ShoppingService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()

export class RecipeService{

  recipesChanged = new Subject<Recipe[]>();

  //  private recipes:Recipe[] = [
  //       new Recipe('Lasagna' , 'Lasagna originated in Italy during the Middle Ages' , 'assets/images/classiclasagna.jpg' ,[
  //         new Ingredients('pasta' ,2),
  //         new Ingredients('grounded meat' ,5),
  //         new Ingredients('onion',2),
  //         new Ingredients('cheese',1/4)
  //       ]) ,
  //       new Recipe('Fish and chips' , 'is a popular hot dish originated in England consisting of fried fish in crispy batter, served with chips' ,
  //       'assets/images/Fish_and_chips_blackpool.jpg' ,[
  //         new Ingredients('haddock Fish' ,1),
  //         new Ingredients('Potato',2),
  //         new Ingredients('butter',1/4)
  //       ]) ,
  //       new Recipe('Falafel','is a deep-fried ball or patty-shaped fritter in Middle Eastern cuisine (especially in Egyptian cuisines)',
  //       'assets/images/Falafel_balls.jpg' ,[
  //         new Ingredients('Fava Beans' ,10),
  //         new Ingredients('parsely',5),
  //         new Ingredients('coriander',3),
  //         new Ingredients('garlic',1)
  //       ]) ,
  //       new Recipe('Paella' ,'It is one of the best-known dishes in Spanish cuisine.' ,'assets/images/paella.jpg',[
  //         new Ingredients('rice' ,4),
  //         new Ingredients('Tomato Paste' ,2),
  //         new Ingredients ('Chicken slices' ,15),
  //         new Ingredients('onion' ,2),
  //         new Ingredients('shrimps',7),
  //         new Ingredients('Vegetables',3)
  //        ]) ,
  //        new Recipe('Penne Alfredo Pasta' , 'This One-Pot Penne Alfredo Pasta wonder is crafted to make getting pasta Alfredo on the table in no time and a slightly healthier option' ,
  //        'assets/images/Penne Alfredo.jpg' ,[
  //         new Ingredients('milk' ,2.5),
  //         new Ingredients('penne pasta',1),
  //         new Ingredients('garlic cloves',3),
  //         new Ingredients('parmesan cheese' ,3/4),
  //         new Ingredients('chicken broth' ,2)
  //        ])
  //     ]

      private recipes:Recipe[]=[];

      constructor(private shoppingService:ShoppingService) {}

      getRecipe(){
       return this.recipes;
    }

    getRecipeById(index:number){
      return this.recipes[index]
    }

    upOnFetch(fetchedRecipes:Recipe[]){
      this.recipes=fetchedRecipes;
      this.recipesChanged.next(this.recipes);
    }

    onAddToShoppingList(ingredients:Ingredients[]){
      this.shoppingService.addIngredientsFromRecipe(ingredients)
    }

    onAddRecipe(recipe:Recipe){
      this.recipes.push(recipe)
    }
    onUpdateRecipe(index:number , newRecpie:Recipe){
      this.recipes[index]=newRecpie;
      this.recipesChanged.next(this.recipes);
    }
    onDeleteRecipe(index:number){
      this.recipes.splice(index,1)
    }

}

