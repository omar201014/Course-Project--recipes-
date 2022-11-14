import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes:Recipe[] = [
    new Recipe('Lasagna' , 'This the Lasagna Recipe Description' , '../../../assets/images/image.jpeg') ,
    new Recipe('Hamburger' , 'This the Hamburger Recipe Description' , '../../../assets/images/Realistic Fast Food.jpg')     
  ]
  @Output() recipeSelection = new EventEmitter<Recipe>()

  constructor() { }

  ngOnInit(): void {
  }
  onSelection(recipe:Recipe){
    this.recipeSelection.emit(recipe)
  }

}
