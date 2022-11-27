import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recpies.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipeItem:Recipe;
  id:number;
  constructor(private recipeService:RecipeService ,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params:Params)=>{
        this.id=+params['id']
        this.recipeItem= this.recipeService.getRecipeById(this.id)
      }
    )
  }

  onAddToSL(){
    this.recipeService.onAddToShoppingList(this.recipeItem.ingredients)
    this.router.navigate(['/shopping-list'])
  }

  onEdit(){
    this.router.navigate(['edit'] ,{relativeTo:this.route})
  }
}
