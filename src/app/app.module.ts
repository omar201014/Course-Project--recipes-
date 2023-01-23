import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recpies.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule    
  ],
  providers:[ShoppingService , RecipeService ,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
