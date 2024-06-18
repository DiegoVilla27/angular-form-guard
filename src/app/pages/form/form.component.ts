import { Component, HostListener } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import {
  ErrorMsgComponent,
  IErrorMsg
} from "../../components/error-msg/error-msg.component";
import { ClassByStateInputDirective } from "../../directives/class-by-state-input.directive";
import { HasUnsavedChanges } from "../../guards/deactivate/unsaved-changes.guard";
import { validations } from "./validations";

@Component({
  selector: "app-form",
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ErrorMsgComponent,
    ClassByStateInputDirective
  ],
  templateUrl: "./form.component.html",
  styleUrl: "./form.component.scss"
})
export class FormComponent implements HasUnsavedChanges {
  form!: FormGroup;
  validations: IErrorMsg = validations;
  clearStates: boolean = false;

  @HostListener("window:beforeunload", ["$event"])
  onBeforeUnloadHandler() {
    return this.hasUnsavedChanges() === false;
  }

  constructor(
    private _fb: FormBuilder,
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
      this.resetForm();
    }
  }

  resetForm(): void {
    this.form.patchValue({
      name: "",
      email: "",
      age: ""
    });
    this.form.reset();
    this.clearStates = true;
    setTimeout(() => (this.clearStates = false), 0);
  }

  goTo(): void {
    this._router.navigateByUrl("/");
  }

  hasUnsavedChanges(): boolean {
    return this.form.dirty;
  }
}
