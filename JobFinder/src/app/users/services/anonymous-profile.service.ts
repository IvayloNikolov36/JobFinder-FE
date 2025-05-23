import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AnonymousProfileCreate } from "../models";
import { activate } from "../../core/controllers";

@Injectable({
    providedIn: 'root'
})
export class AnonymousProfileService {

    constructor(private http: HttpClient) { }

    activate = (profileData: AnonymousProfileCreate): Observable<object> => {
        return this.http.post(activate(), profileData);
    }
}
