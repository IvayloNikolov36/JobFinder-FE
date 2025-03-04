import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { getMyProfileData } from "../../core/controllers";
import { UserProfileData } from "../models";

@Injectable({
    providedIn: 'root'
})
export class UserProfileService implements OnInit {

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.getMyProfileData();
    }

    getMyProfileData = (): Observable<UserProfileData> => {
        return this.http.get<UserProfileData>(getMyProfileData());
    }
}
