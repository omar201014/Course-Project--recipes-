import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recpies.service";

@Injectable({providedIn:'root'})

export class DataStorageService{

constructor(private http:HttpClient , private recipeService:RecipeService){}

storeRecipe(){
  const recipes:Recipe[] = this.recipeService.getRecipe();

  this.http.put(
    'https://deli-rexpies-default-rtdb.firebaseio.com/recipes.json'
    ,recipes
    )
    .subscribe(response =>{
      // console.log(response);
    })
}

fetchRecipe(){
  return this.http.get<Recipe[]>('https://deli-rexpies-default-rtdb.firebaseio.com/recipes.json')
  .pipe(map(recipes =>{
    return recipes.map(recipe => {
      return {...recipe , ingredients: recipe.ingredients ? recipe.ingredients:[]};
    });
  }),
  tap(recipes =>{
    this.recipeService.upOnFetch(recipes);
  })
  )
}


}
