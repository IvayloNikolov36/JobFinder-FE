import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AnonymousProfileCreate } from "../models";
import { activate, view } from "../../core/controllers";

@Injectable({
    providedIn: 'root'
})
export class AnonymousProfileService {

    constructor(private http: HttpClient) { }

    view = (): Observable<object> => {
        return this.http.get<object>(view());
    }

    activate = (cvId: string, profileData: AnonymousProfileCreate): Observable<object> => {
        return this.http.post(activate(cvId), profileData);
    }
}
