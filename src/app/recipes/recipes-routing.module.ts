import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../auth/auth-guard.service";

import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeResolverService } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";

const routes:Routes =[
    {path:'recipes' ,component:RecipesComponent,canActivate:[AuthGuardService],children:[
        {path:'',component:RecipeStartComponent},
        {path:'new' ,component:RecipeEditComponent},    // pay attention that the router with dynamic paramater must come after this one //
        {path:':id' , component:RecipeDetailsComponent , resolve:[RecipeResolverService]},
        {path:':id/edit' ,component:RecipeEditComponent, resolve:[RecipeResolverService]}
    ]}
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class RecipesRoutingModule {}