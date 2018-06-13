import { Injectable } from '@angular/core';
import { HttpService } from '../util/http.service';
import { Observable } from 'rxjs/Observable';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Injectable()
export class ToasterService {
  private MESSAGES = {
    LOGIN_SUCCESS: 'Login success',
  };

  private toastOptions: ToastOptions;
  messagesContainer = [];

  constructor(
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig) {
      this.toastyConfig.theme = 'material';
      this.toastOptions = {
        title: 'Success',
        showClose: true,
        timeout: 2000,
        theme: 'material',
        onAdd: (toast: ToastData) => {
          if (this.messagesContainer.includes(toast.msg)) {
            this.toastyService.clear(toast.id);
          }
          this.messagesContainer.push(toast.msg);
        },
        onRemove: (toast: ToastData) => {
          if (this.messagesContainer.includes(toast.msg)) {
            this.messagesContainer.splice(this.messagesContainer.indexOf(toast.msg), 1);
          }
        }
      };
    }

  displayToast(msg) {
    this.toastOptions.msg = msg;
    this.toastyService.success(this.toastOptions);
  }

  displayError(msg) {
    this.toastOptions.title = 'Error';
    this.toastOptions.msg = msg;
    this.toastyService.error(this.toastOptions);
  }

  displayToastExtendTime(msg) {
    this.toastOptions.msg = msg;
    this.toastOptions.timeout = 10000;
    this.toastyService.success(this.toastOptions);
  }
  
}
