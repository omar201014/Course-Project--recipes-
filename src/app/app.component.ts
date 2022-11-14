import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipesProject';
  selection:string='Recipe';     //default//
  onNavigate(userSelction:string){
    this.selection = userSelction ;
  }
}
