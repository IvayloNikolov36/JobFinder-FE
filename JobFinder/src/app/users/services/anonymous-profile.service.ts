import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AnonymousProfileCreate } from "../models";
import { AnonymousProfileController } from "../../core/controllers";

@Injectable({
    providedIn: 'root'
})
export class AnonymousProfileService {

    constructor(private http: HttpClient) { }

    view = (): Observable<object> => {
        return this.http.get<object>(AnonymousProfileController.view());
    }

    create = (cvId: string, profileData: AnonymousProfileCreate): Observable<object> => {
        return this.http.post<object>(AnonymousProfileController.create(cvId), profileData);
    }

    delete = (id: string): Observable<object> => {
        return this.http.delete(AnonymousProfileController.delete(id));
    }
}
