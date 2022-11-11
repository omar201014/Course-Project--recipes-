import { Component, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredients.component';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Ingredients[] =[
    new Ingredients('tomato' , 5),
    new Ingredients('onion' , 2)
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
