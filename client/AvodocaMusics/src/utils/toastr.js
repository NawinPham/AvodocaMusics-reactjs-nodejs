// src/services/ToastrService.js
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const ToastrService = {
  success: (message, title = 'Success') => {
    toastr.success(message, title, {
      closeButton: true,
      progressBar: true,
    positionClass: 'toast-top-right',
      timeOut: 1500,
    });
  },
  error: (message, title = 'Error') => {
    toastr.error(message, title, {
      closeButton: true,
      progressBar: true,
        positionClass: 'toast-top-right',
        timeOut: 1500,
    });
  },
  info: (message, title = 'Info') => {
    toastr.info(message, title, {
      closeButton: true,
      progressBar: true,
        positionClass: 'toast-top-right',
        timeOut: 1500,
    });
  },
  warning: (message, title = 'Warning') => {
    toastr.warning(message, title, {
      closeButton: true,
      progressBar: true,
        positionClass: 'toast-top-right',
        timeOut: 1500,
    });
  },
};

export default ToastrService;
