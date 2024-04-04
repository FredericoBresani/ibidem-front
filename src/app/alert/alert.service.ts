import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AlertModel } from "../shared/models/alert.model";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public messageSubject = new Subject<AlertModel>();

  constructor() {/**/}
}
