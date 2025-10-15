import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { UserProfileController } from "../../core/controllers";
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
        return this.http.get<UserProfileData>(UserProfileController.getMyProfileData());
    }

    changeProfilePicture = (file: File): Observable<object> => {
        const formData: FormData = new FormData();
        formData.append('file', file);

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');

        return this.http.post(UserProfileController.changeProfilePicture(), formData, { headers });
    }
}
