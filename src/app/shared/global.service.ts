import { Injectable } from "@angular/core";
import { AuthorizationService } from "./authorization.service";

@Injectable()
export class GlobalService {
  auser1 = "67e253cd-f202-4c5a-8207-9bf3fdc3a78a"; // Bipin -> Admin
  auser2 = "226c4d3e-1dce-4b6a-91e1-9f767fec961f"; // Inderjeet -> Admin
  auser3 = "d27b1e25-dcc5-419e-99ae-0f9d744faf50"; // Anuj -> Admin

  suser1 = "a5056179-01dd-4b12-8526-4cf067d3c0c4"; // Vikas -> Scorer
  suser2 = "9c14f379-0cde-4866-ba25-da7eb7baa0cc"; // score2

  puser1 = "eda1a676-dd74-4a7c-b1f2-8eca49b0212d"; // projector
  puser2 = "cb200e02-f472-42e6-8884-a8be878cf8d8"; //  Deepak -> Projector

  constructor(private auth: AuthorizationService) {
    localStorage.setItem("auser1", this.auser1);
    localStorage.setItem("auser2", this.auser2);
    localStorage.setItem("auser3", this.auser3);

    localStorage.setItem("suser1", this.suser1);
    localStorage.setItem("suser2", this.suser2);

    localStorage.setItem("puser1", this.puser1);
    localStorage.setItem("puser2", this.puser2);
  }
  public localStorageItem(id: string): string {
    return localStorage.getItem(id);
  }

  public setlocalStorageItem(id: string, value) {
    localStorage.setItem(id, value);
  }

  public removelocalStorageItem(id: string) {
    localStorage.removeItem(id);
  }

  isAUser() {
    if (this.auth.isLoggedIn()) {
      if (this.auth.getAuthenticatedUser() != null) {
        if (
          this.auth.getAuthenticatedUser().getUsername() ==
            this.localStorageItem("auser1") ||
          this.auth.getAuthenticatedUser().getUsername() ==
            this.localStorageItem("auser2") ||
          this.auth.getAuthenticatedUser().getUsername() ==
            this.localStorageItem("auser3")
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isSUser() {
    if (this.auth.isLoggedIn()) {
      if (this.auth.getAuthenticatedUser() != null) {
        if (
          this.auth.getAuthenticatedUser().getUsername() ==
            this.localStorageItem("suser1") ||
          this.auth.getAuthenticatedUser().getUsername() ==
            this.localStorageItem("suser2")
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isPUser() {
    if (this.auth.isLoggedIn()) {
      if (this.auth.getAuthenticatedUser() != null) {
        if (
          this.auth.getAuthenticatedUser().getUsername() ==
          this.localStorageItem("puser1") ||
          this.auth.getAuthenticatedUser().getUsername() ==
          this.localStorageItem("puser2")
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
