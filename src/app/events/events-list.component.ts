import { Component, OnInit } from "@angular/core";
import { EventService } from "./shared/event.service";
import { IEvent } from "./shared/event.model";

@Component({
  templateUrl: "./events-list.component.html"
})
export class EventsListComponent implements OnInit {
  events: IEvent[];
  constructor(private eventService: EventService) {}

  //the ngOnInit method is called when the component is loaded
  ngOnInit() {
    this.events = this.eventService.getEvents();
  }
}
