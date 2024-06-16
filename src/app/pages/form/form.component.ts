import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { ErrorMsgComponent } from "../../components/error-msg/error-msg.component";
import {
  CanComponentLeaveRoute,
  TCanComponentLeaveRoute
} from "../../guards/deactivate/form-changed.guard";
import { UiService } from "../../services/ui.service";
import { validations } from "./validations";

@Component({
  selector: "app-form",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ErrorMsgComponent],
  templateUrl: "./form.component.html",
  styleUrl: "./form.component.scss"
})
export class FormComponent implements CanComponentLeaveRoute {
  form!: FormGroup;
  validations = validations;

  constructor(
    private _fb: FormBuilder,
    private _uiSvc: UiService,
    private _router: Router
  ) {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this._fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      age: ["", [Validators.required]]
    });
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.form.reset();
      this.form.patchValue({
        name: "",
        email: "",
        age: ""
      });
      this.form.markAsPristine();
    }
  }

  goTo(): void {
    this._router.navigateByUrl("/");
  }

  canDeactivate(): TCanComponentLeaveRoute {
    if (this.form.dirty) {
      const deactivateSubject: Subject<boolean> = new Subject<boolean>();
      this._uiSvc.showQuestion(
        "¿Estás seguro de que quieres abandonar la página? Se perderán los cambios no guardados.",
        () => deactivateSubject.next(true),
        () => deactivateSubject.next(false)
      );
      return deactivateSubject;
    }
    return true;
  }
}
