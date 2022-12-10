import { Component, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredients.component';
import { ShoppingService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
  
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredients[]

  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void {
    this.ingredients=this.shoppingService.getIngredients();
  }
  onIngredientAdded(ing:Ingredients){
    this.ingredients.push(ing)
  }

  onEditItem(index){
    this.shoppingService.ingEditing.next(index)
  }

}
