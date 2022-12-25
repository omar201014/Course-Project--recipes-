import { RecipeService } from './recpies.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";

@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{

  constructor(private storageService:DataStorageService ,private recipeService:RecipeService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes:Recipe[] = this.recipeService.getRecipe();
    if(recipes.length ===0){
    return this.storageService.fetchRecipe();
    }else{
      return recipes;
    }
  }

}
