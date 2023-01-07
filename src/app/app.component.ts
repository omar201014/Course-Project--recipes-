import { OnInit } from '@angular/core';
import { Component, ViewEncapsulation } from '@angular/core';
import { AuthServiceService } from './auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'Deli Recipe | Essence of Tasty';

  constructor(private authService:AuthServiceService) {}

  ngOnInit(): void {
    this.authService.autoLogin();
  }

}
