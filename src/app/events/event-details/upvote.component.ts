import { Component, EventEmitter, Input, Output } from "@angular/core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartEmpty } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: "upvote",
  styleUrls: ["./upvote.component.css"],
  template: `
    <div class="votingWidgetContainer pointable" (click)="onClick()">
      <div class="well votingWidget">
        <div class="votingButton">
          <fa-icon *ngIf="voted" [icon]="faHeart"></fa-icon>
          <fa-icon *ngIf="!voted" [icon]="faHeartEmpty"></fa-icon>
        </div>
        <div class="badge badge-inverse votingCount">
          <div>{{ count }}</div>
        </div>
      </div>
    </div>
  `
})
export class UpvoteComponent {
  @Input() count: number;
  @Input() voted: boolean;
  @Output() vote = new EventEmitter();
  faHeart = faHeart;
  faHeartEmpty = faHeartEmpty;

  onClick() {
    this.vote.emit({});
  }
}