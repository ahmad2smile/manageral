import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';

import { GroupComponent } from './components/group/group.component';
import { UserComponent } from './components/user/user.component';

import { AllgroupsComponent } from './pages/allgroups/allgroups.component';
import { AllusersComponent } from './pages/allusers/allusers.component';
import { UserdetailsComponent } from './pages/userdetails/userdetails.component';
import { GroupdetailsComponent } from './pages/groupdetails/groupdetails.component';
import { HomeComponent } from './pages/home/home.component';

import { DataService } from "./services/index";
import { NewgroupComponent } from './pages/newgroup/newgroup.component';
import { NewuserComponent } from './pages/newuser/newuser.component';

const routes: Routes = [
	{ path: "", component: HomeComponent, pathMatch: "full" },
	{ path: "groups", component: AllgroupsComponent },
	{ path: "users", component: AllusersComponent },
	{ path: "newgroup", component: NewgroupComponent },
	{ path: "newuser", component: NewuserComponent },
	{ path: "group/:id", component: GroupdetailsComponent },
	{ path: "group/:id", component: GroupdetailsComponent },
];  

@NgModule({
  declarations: [
    AppComponent,
    GroupComponent,
    UserComponent,
    AllgroupsComponent,
    AllusersComponent,
    UserdetailsComponent,
    GroupdetailsComponent,
    HomeComponent,
    NewgroupComponent,
    NewuserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	RouterModule.forRoot(routes)
  ],
  providers: [
	  DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
