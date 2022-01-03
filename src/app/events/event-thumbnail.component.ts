import { Component, Input } from "@angular/core";
import { IEvent } from "./shared/index";

@Component({
  selector: "event-thumbnail",
  template:
    `
    <div [routerLink]="['/events', event.id]" class="well hoverwell thumbnail">
      <h2>{{ event?.name | uppercase }}</h2>
      <div>Date: {{ event?.date | date:'shortDate' }}</div>
      <div [ngClass]="getStartTimeClass()" ` + // à la place de le fonction getStartTimeClass() on aurait pu utiliser : [ngClass]="{green: event?.time==='8:00 am', bold: event?.time==='8:00 am'}"
    // NB: on aurait pu utiliser ngStyle au lieu de ngClass avec le même fonctionnement
    ` [ngSwitch]="event?.time">
        Time: {{ event?.time }}
        <span *ngSwitchCase="'8:00 am'"> (Early Start)</span>
        <span *ngSwitchCase="'10:00 am'"> (Late Start)</span>
        <span *ngSwitchDefault> (Normal Start)</span>
      </div>
      <div>Price: {{ event?.price | currency:'USD' }}</div>
      <div *ngIf="event?.location" > ` + //à la place de la Structural Directive ngIf on aurait pu utiliser la propriété [hidden] :  [hidden]="!event?.location"
    `<span>Location: {{ event?.location?.address }}</span>
        <span class="pad-left"
          >{{ event?.location?.city }}, {{ event?.location?.country }}</span
        >
      </div>
      <div *ngIf="event?.onlineUrl">Online URL: {{ event?.onlineUrl }}</div> ` + //à la place de la Structural Directive ngIf on aurait pu utiliser la propriété [hidden] :  [hidden]="!event?.onlineUrl"
    `</div>
  `,
  styles: [
    `
      .green {
        color: #003300 !important;
      }
      .bold {
        font-weight: bold;
      }
      .thumbnail {
        min-height: 210px;
      }
      .pad-left {
        margin-left: 10px;
      }
      .well div {
        color: #bbb;
      }
    `
  ]
})
export class EventThumbnailComponent {
  @Input() event: IEvent;

  getStartTimeClass() {
    if (this.event && this.event.time === "8:00 am") {
      return ["green", "bold"];
    } else {
      return [];
    }
  }
}
