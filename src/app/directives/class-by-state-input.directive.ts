import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2
} from "@angular/core";
import { FormControlStatus, NgControl } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";

@Directive({
  selector: "[appClassByStateInput]",
  standalone: true
})
export class ClassByStateInputDirective implements OnInit, OnDestroy {
  @Input({ required: true }) loadInitialState: boolean = false;
  @Input({ required: true }) set clearStates(value: boolean) {
    if (value) this.clearAllStates();
  }
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _el: ElementRef,
    private _ngControl: NgControl,
    private _renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (this.loadInitialState) this.initializeState();
    this.watchStates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeState(): void {
    const { valid } = this._ngControl.control!;
    this.updateClasses(valid ? "VALID" : "INVALID");
  }

  private watchStates(): void {
    this._ngControl
      .control!.statusChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value: FormControlStatus) => this.updateClasses(value));
  }

  private updateClasses(state: FormControlStatus): void {
    if (state === "VALID" || state === "INVALID") {
      this._renderer.removeClass(
        this._el.nativeElement,
        state === "VALID" ? "is-invalid" : "is-valid"
      );
      this._renderer.addClass(
        this._el.nativeElement,
        state === "VALID" ? "is-valid" : "is-invalid"
      );
    }
  }

  private clearAllStates(): void {
    this._renderer.removeClass(this._el.nativeElement, "is-valid");
    this._renderer.removeClass(this._el.nativeElement, "is-invalid");
  }
}
