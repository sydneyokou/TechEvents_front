import { Component, OnInit } from "@angular/core";
import { EventService } from "../shared/event.service";
import { ActivatedRoute, Params } from "@angular/router";
import { IEvent, ISession } from "../shared/index";

@Component({
  templateUrl: "./event-details.component.html",
  styles: [
    `
      .container {
        padding-left: 2;
        padding-right: 20px;
      }
      .event-image {
        height: 100px;
      }
      a {
        cursor: pointer;
      }
    `
  ]
})
export class EventDetailsComponent implements OnInit {
  event: IEvent;
  addMode: boolean;
  filterBy: string = "all";
  sortBy: string = "votes";

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.event = this.eventService.getEvent(+params["id"]);
      this.addMode = false;
    });
    //the "+" cast a string to a number
  }

  addSession() {
    this.addMode = true;
  }

  saveNewSession(session: ISession) {
    const lastId = Math.max.apply(
      null,
      this.event.sessions.map((s) => s.id)
    );
    session.id = lastId + 1;
    this.event.sessions.push(session);
    this.eventService.updateEvent(this.event);

    this.addMode = false;
  }

  cancelAddSession() {
    this.addMode = false;
  }
}
