import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import * as OBC from "@thatopen/components";
import * as FRAGS from "@thatopen/fragments";
import * as BUI from "@thatopen/ui";
import * as WEBIFC from "web-ifc";



@Injectable({
  providedIn: 'root'
})
export class IfcViewerService {
  private _model: any
  private _
  public modelSubject: Subject<any> = new Subject<any>();
  public tableSubject: Subject<void> = new Subject<void>();

  get model() {
    return this._model
  }

  set model(model: any) {
    this._model = model;
    this.modelSubject.next(model);
  }

}
