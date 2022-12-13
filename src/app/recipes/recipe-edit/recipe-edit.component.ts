import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  constructor(private route:ActivatedRoute ,private router:Router ,private recpieService:RecipeService) { }

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
    console.log(this.recipeForm.value);
    if(this.editMode){
      this.recpieService.onUpdateRecipe(this.id,this.recipeForm.value)
    }else{
      this.recpieService.onAddRecipe(this.recipeForm.value)
    }
    this.onCancel()
  }

  onCancel(){
    this.router.navigate(['../'] , {relativeTo:this.route})
  }

  onRemoveIng(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }
  onClearAll(){
    (<FormArray>this.recipeForm.get('ingredients')).clear()
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name':new FormControl(null , [Validators.required]),
      'amount':new FormControl(null , [Validators.required , Validators.pattern(/^(?!(?:0|0\.0|0\.00)$)[+]?\d+(\.\d|\.\d[0-9])?$/)])
      })
    );
  }

  private InitForm() {
    let recipeName:string ='';
    let recipeImgPath:string='';
    let description:string='';
    let ingredientFormArr:FormArray=new FormArray([]);
    

    if(this.editMode){
      recipeName = this.recpieService.getRecipeById(this.id).name
      recipeImgPath = this.recpieService.getRecipeById(this.id).imgPath
      description = this.recpieService.getRecipeById(this.id).description
      const ingredients =this.recpieService.getRecipeById(this.id).ingredients

      if(ingredients){
        for(let ingredient of ingredients) {
          ingredientFormArr.push(new FormGroup({
            'name':new FormControl(ingredient.name , [Validators.required]),
            'amount':new FormControl(ingredient.amount,[Validators.required , Validators.pattern(/^(?!(?:0|0\.0|0\.00)$)[+]?\d+(\.\d|\.\d[0-9])?$/)])
          }))
        }
      }
    }
    
    this.recipeForm = new FormGroup({
        'name':new FormControl(recipeName,[Validators.required]),
        'imgPath':new FormControl(recipeImgPath,[Validators.required]),
        'description':new FormControl(description,[Validators.required]),
        'ingredients':ingredientFormArr
    })
  } 

}
