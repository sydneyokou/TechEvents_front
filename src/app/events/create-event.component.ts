import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { EventService } from "./shared";
import { IEvent} from "./shared/event.model";

@Component({
  templateUrl: "create-event.component.html",
  styles: [
    `
      em {
        float: right;
        color: #e05c65;
        padding-left: 10px;
      }
      .error input {
        background-color: #e3c3c5;
      }
      .error ::-webkit-input-placeholder {
        color: #999;
      }
      .error ::-moz-placeholder {
        color: #999;
      }
      .error :-moz-placeholder {
        color: #999;
      }
      .error :ms-input-placeholder {
        color: #999;
      }
    `
  ]
})
export class CreateEventComponent {
  newEvent : IEvent;
  isDirty: boolean = true;
  constructor(private router: Router, private eventService: EventService) {}

  async saveEvent(formValues : IEvent) {
    await this.save(formValues);
    this.isDirty = false;
    this.router.navigate(["/events"]);
  }

  save(formValues:IEvent){
    return new Promise<void>((resolve, reject) => {
      this.eventService.saveEvent(formValues).subscribe(
        response => {
          console.log(response);
          resolve();
        }, 
        (error) => {alert(error.message); resolve()});

    })
  }

  cancel() {
    this.router.navigate(["/events"]);
  }
}
