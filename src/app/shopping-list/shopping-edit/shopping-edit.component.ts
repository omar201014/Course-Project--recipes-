import { Component,OnDestroy,OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredients } from 'src/app/shared/ingredients.component';
import { ShoppingService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit ,OnDestroy{
  subscription:Subscription;
  itemEdited:boolean=false;
  editedItemIndex:number;
  editedItem:Ingredients;
  @ViewChild('form' , {static:false}) formObject:NgForm;
  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void{
    this.subscription = this.shoppingService.ingEditing.subscribe(
      (index:number)=>{
        this.editedItemIndex=index;
        this.itemEdited=true;
        this.editedItem = this.shoppingService.getIngerdientToEdit(index)
        this.formObject.setValue({
          ingName:this.editedItem.name ,
          ingAmount:this.editedItem.amount
        })
      }
    )
  }


  onSubmitItem(form:NgForm){
    const fromValue = form.value
    const newIngredient = new Ingredients(fromValue.ingName,fromValue.ingAmount)
    if(this.itemEdited ===true){
      this.shoppingService.onUpdateIngredient(this.editedItemIndex , newIngredient)
    }else{
    this.shoppingService.addIngredients(newIngredient)
    }
    this.itemEdited=false;
    console.log(form);
    form.reset();
  }



  onClear(form:NgForm){
    form.reset()
    this.itemEdited= false;
  }
  onDelete(form:NgForm){
    this.shoppingService.onDeleteIngredients(this.editedItemIndex)
    this.onClear(form)
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe()
  }
}

