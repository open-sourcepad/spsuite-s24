import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { _throw } from 'rxjs/observable/throw';


@Injectable()
export class CommonService {

  extractData(response: Response) {
    const body = response.json();
    return body || { };
  }

  handleError (error: Response | any) {
    return _throw(error);
  }

}
