import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.component';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('ingName' , {static:false}) ingNameRef:ElementRef;
  @ViewChild('ingAmount' , {static:false}) ingAmountRef:ElementRef
  @Output() ingredientAdded = new EventEmitter<Ingredients>()

  constructor() { }

  ngOnInit(): void {
  }

  onAddIng(){
    const newIngredient = new Ingredients(this.ingNameRef.nativeElement.value , this.ingAmountRef.nativeElement.value);
    this.ingredientAdded.emit(newIngredient)
  }
} 

