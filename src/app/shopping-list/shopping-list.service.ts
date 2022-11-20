import { Ingredients } from "../shared/ingredients.component";

export class ShoppingService{
   private ingredients:Ingredients[] =[];

    getIngredients(){
        return this.ingredients;
    }

    addIngredients(ingredient:Ingredients){
        this.ingredients.push(ingredient);
    }

    addIngrefientsFromRecipe(ingredient:Ingredients[]){
        this.ingredients.push(...ingredient)
    }
    onClearIngredients(){
        this.ingredients.splice(0,this.ingredients.length)
    }
}