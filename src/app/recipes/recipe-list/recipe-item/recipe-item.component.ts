import { Component,Input,OnInit} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recpies.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() selectedRecipe:Recipe;
  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
  }
  onItemSelected(){
    this.recipeService.recipeSelected.emit(this.selectedRecipe)
  }

}
