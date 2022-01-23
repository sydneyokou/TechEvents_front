import { Injectable } from "@angular/core";
import { ISession , IEvent} from "../shared/event.model";
import { EventService } from "../shared/event.service";

@Injectable()
export class VoterService {

  constructor (private eventService : EventService){

  }

  update(event){
    return new Promise<void>((resolve)=> {
     this.eventService.updateEvent(event, event.id).subscribe(response => {console.log(response); resolve()}, (error) => {alert(error.message); resolve()});
   })
 }

  async deleteVoter(event: IEvent, session: ISession, voterName: string) {
    session.voters = session.voters.filter((voter) => voter !== voterName);
    console.log(event.sessions);
    this.eventService.updateEvent(event , event.id );
    await this.update(event);
  }

  async addVoter(event: IEvent, session: ISession, voterName: string) {
    session.voters.push(voterName);
    console.log(event.sessions);
    this.eventService.updateEvent(event , event.id );
    await this.update(event);
  }

  userHasVoted(session: ISession, voterName: string) {
    return session.voters.some((voter) => voter === voterName); //some returns true if at least one el of the array validates condition, false if not
  }
}
