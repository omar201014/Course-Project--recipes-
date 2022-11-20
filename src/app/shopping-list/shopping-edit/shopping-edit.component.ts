import { Component,ElementRef,OnInit,ViewChild } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.component';
import { ShoppingService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('ingName' , {static:false}) ingNameRef:ElementRef;
  @ViewChild('ingAmount' , {static:false}) ingAmountRef:ElementRef

  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void {
  }

  onAddIng(){
    const newIngredient = new Ingredients(this.ingNameRef.nativeElement.value , this.ingAmountRef.nativeElement.value);
    this.shoppingService.addIngredients(newIngredient)
  }

  onClear(){
    this.shoppingService.onClearIngredients();
  }
} 

