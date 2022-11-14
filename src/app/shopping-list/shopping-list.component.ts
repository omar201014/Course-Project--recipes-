import { Component, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredients.component';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredients[] =[];
    

  constructor() { }

  ngOnInit(): void {
  }
  onIngredientAdded(ing:Ingredients){
    this.ingredients.push(ing)
  }

}
