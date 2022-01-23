import { Injectable } from "@angular/core";
import { IUser } from "./user.model";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthService {
  currentUser: IUser;
  users = environment.users;
  loginUser(userName: string, password: string) {
    
    for (let user of this.users){
      if(user.userName == userName && user.password == password){
        this.currentUser = user;
      }
    }
    if (!this.currentUser){
      alert("Invalid user or password");
    };



  }

  isAuthenticated() {
    return !!this.currentUser; // return true if the current user is set
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
    
    
  }
}
