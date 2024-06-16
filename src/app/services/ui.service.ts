import { Injectable } from "@angular/core";
import Swal, { SweetAlertResult } from "sweetalert2";

@Injectable({
  providedIn: "root"
})
export class UiService {
  constructor() {}

  showQuestion(
    title: string,
    fnConfirm: () => void,
    fnCancel?: () => void
  ): void {
    Swal.fire({
      title,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      icon: "question",
      iconColor: "#004040"
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) fnConfirm();
      else {
        fnCancel && fnCancel();
        Swal.close();
      }
    });
  }
}
