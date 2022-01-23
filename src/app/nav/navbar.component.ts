import { Component} from "@angular/core";
import { AuthService } from "../user/auth.service";
import { ISession } from "../events/shared/event.model";
import { EventService } from "../events/shared/event.service";

@Component({
  selector: "nav-bar",
  templateUrl: "./navbar.component.html",
  styles: [
    `
      .nav.navbar-nav {
        font-size: 15px;
      }
      #searchForm {
        margin-right: 100px;
      }
      @media (max-width: 1200px) {
        #searchForm {
          display: none;
        }
      }
      li > a.active {
        color: #f97924;
      }
    ` //the last one (@media...)make search bar disapear if the navigator window gets too small
  ]
})
export class NavBarComponent {
  searchTerm: string = "";
  foundSessions: ISession[];
  constructor(
    private authService: AuthService,
    private eventService: EventService
  ) {}

  searchSessions(searchTerm) {
    this.eventService.searchSessions(searchTerm).then((sessions) => {
      this.foundSessions = sessions;
      console.log(this.foundSessions);
    });
  }


 
}

