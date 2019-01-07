import { Injectable } from '@angular/core';
import { AuthorizationService } from "./authorization.service";

@Injectable()
export class GlobalService {
    auser1 = "67e253cd-f202-4c5a-8207-9bf3fdc3a78a";
    auser2 = "d61d7fd6-ccd5-4151-9145-73b9861a6494";
    auser3 = "d27b1e25-dcc5-419e-99ae-0f9d744faf50"; // anuj
    suser1 = "982c8382-0294-4063-949e-6a2d60503471";
    suser2 = "182d8a4b-a9c0-4765-b704-4167173d39fe";
    suser3 = "";
    constructor(private auth: AuthorizationService) {
        localStorage.setItem('auser1', this.auser1);
        localStorage.setItem('auser2', this.auser2);
        localStorage.setItem('suser1', this.suser1);
        localStorage.setItem('suser2', this.suser2);
        localStorage.setItem('auser3', this.auser3);
    }
    public localStorageItem(id: string): string {
        return localStorage.getItem(id);
    }

    public setlocalStorageItem(id: string, value) {
        localStorage.setItem(id, value);
    }


    isAUser() {
        if (this.auth.isLoggedIn()) {
            if (this.auth.getAuthenticatedUser() != null) {
                if (this.auth.getAuthenticatedUser().getUsername() == this.localStorageItem("auser1") ||
                    this.auth.getAuthenticatedUser().getUsername() == this.localStorageItem("auser2") ||
                    this.auth.getAuthenticatedUser().getUsername() == this.localStorageItem("auser3")) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
        else {
            return false;
        }
    }



    isSUser() {
        if (this.auth.isLoggedIn()) {
            if (this.auth.getAuthenticatedUser() != null) {
                if (this.auth.getAuthenticatedUser().getUsername() == this.localStorageItem("suser1") || this.auth.getAuthenticatedUser().getUsername() == this.localStorageItem("suser2")) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
        else {
            return false;
        }
    }
}