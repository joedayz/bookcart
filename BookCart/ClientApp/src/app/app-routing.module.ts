import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";



const appRoutes: Routes = [

];


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],

  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
