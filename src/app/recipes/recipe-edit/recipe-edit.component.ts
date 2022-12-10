import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recpies.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode:boolean;
  recipeForm:FormGroup;
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  constructor(private route:ActivatedRoute , private recpieService:RecipeService) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.editMode = params['id'] != null;
        //  console.log(this.editMode);  //to check which mode we are in //
        this.InitForm()
        
      }
    )
    
  }

  

  onSubmit(){
    console.log(this.recipeForm);
  }

  private InitForm() {
    let recipeName:string ='';
    let recipeImgPath:string='';
    let description:string='';
    let ingredientFormArr:FormArray=new FormArray([]);
    

    if(this.editMode){
      const ingredients =this.recpieService.getRecipeById(this.id).ingredients
      recipeName = this.recpieService.getRecipeById(this.id).name
      recipeImgPath = this.recpieService.getRecipeById(this.id).imgPath
      description = this.recpieService.getRecipeById(this.id).description

      if(ingredients){
        for(let ingredient of ingredients) {
          ingredientFormArr.push(new FormGroup({
            'name':new FormControl(ingredient.name),
            'amount':new FormControl(ingredient.amount)
          }))
        }
      }
    }
    
    this.recipeForm = new FormGroup({
        'name':new FormControl(recipeName),
        'image':new FormControl(recipeImgPath),
        'description':new FormControl(description),
        'ingredients':ingredientFormArr
    })
  }

}
