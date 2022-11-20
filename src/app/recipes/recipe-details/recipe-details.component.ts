import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recpies.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  @Input() recipeItem:Recipe;
  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
  }

  onAddToSL(){
    this.recipeService.onAddToShoppingList(this.recipeItem.ingredients)
  }
}
