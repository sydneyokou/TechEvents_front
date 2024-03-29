import { Component, Input, OnChanges } from "@angular/core";
import { ISession, IEvent } from "../shared/index";
import { AuthService } from "../../user/auth.service";
import { VoterService } from "./voter.service";
import { faFire } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "session-list",
  templateUrl: "./session-list.component.html",
  styles: []
})
export class SessionListComponent implements OnChanges {
  @Input() event : IEvent;
  @Input() sessions: ISession[];
  @Input() filterBy: string;
  @Input() sortBy: string;
  visibleSessions: ISession[] = [];
  faFire = faFire;

  constructor(
    private authService: AuthService,
    private voterService: VoterService
  ) {}

  ngOnChanges() {
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortBy === "name"
        ? this.visibleSessions.sort(sortByNameAsc)
        : this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  filterSessions(filter) {
    if (filter === "all") {
      this.visibleSessions = this.sessions.slice(0);
    } else {
      this.visibleSessions = this.sessions.filter((session) => {
        return session.level.toLocaleLowerCase() === filter;
      });
    }
  }

  async toggleVote(session: ISession) {
    if (this.userHasVoted(session)) {
      await this.voterService.deleteVoter(
        this.event,
        session,
        this.authService.currentUser.userName
      );
    } else {
      await this.voterService.addVoter(
        this.event,
        session,
        this.authService.currentUser.userName
      );
    }

    if (this.sortBy === "votes") {
      this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  userHasVoted(session: ISession) {
    return this.voterService.userHasVoted(
      session,
      this.authService.currentUser.userName
    );
  }
}

function sortByNameAsc(s1: ISession, s2: ISession) {
  if (s1.name > s2.name) return 1;
  else if (s1.name === s2.name) return 0;
  else return -1;
}
function sortByVotesDesc(s1: ISession, s2: ISession) {
  return s2.voters.length - s1.voters.length;
}
