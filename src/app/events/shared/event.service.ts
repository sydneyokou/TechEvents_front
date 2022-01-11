import { Injectable, EventEmitter } from "@angular/core";
import { IEvent, ISession } from "./event.model";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from "src/environments/environment";

@Injectable()
export class EventService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient){};

  getEvents(): Observable<IEvent[]> {
   return this.http.get<IEvent[]>(`${this.apiServerUrl}/api/v1/events/all`);
    
  }

  saveEvent(event : IEvent) :Observable<IEvent> {
      return this.http.post<IEvent>(`${this.apiServerUrl}/api/v1/events/add`, event);
      
  }

  updateEvent(event : IEvent): Observable<IEvent> {
     return this.http.put<IEvent>(`${this.apiServerUrl}/api/v1/events/update`, event);
  }

  getEvent(id: String): Observable<IEvent> {
    return this.http.get<IEvent>(`${this.apiServerUrl}/api/v1/events/find/${id}`);
   
  }

  deleteEvent(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/api/v1/events/delete/${id.toString()}`);
  }

  searchSessions(searchTerm: string) {
    var term = searchTerm.toLocaleLowerCase();
    var results: ISession[] = [];
    
    this.getEvents().subscribe((response) => 
      {
        response.forEach((event) => {
          var matchingSessions = event.sessions.filter(
            (session) => session.name.toLocaleLowerCase().indexOf(term) > -1
          );
          matchingSessions = matchingSessions.map((session: any) => {
            session.eventId = event.id;
            return session;
          });
          results = results.concat(matchingSessions);
        });
      }
    );
    

    var emitter = new EventEmitter(true); //we want searchSession() to return an observable
    setTimeout(() => {
      // we want to simulate a delay of http request responding
      emitter.emit(results);
    }, 100);
    return emitter;
  }
  

}



