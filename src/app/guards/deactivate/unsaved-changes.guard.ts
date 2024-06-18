import { inject } from "@angular/core";
import { CanDeactivateFn } from "@angular/router";
import { Subject } from "rxjs";
import { UiService } from "../../services/ui.service";

export interface HasUnsavedChanges {
  hasUnsavedChanges(): boolean;
}

export const UnsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = (
  component: HasUnsavedChanges
) => {
  if (component.hasUnsavedChanges()) {
    const deactivateSubject: Subject<boolean> = new Subject<boolean>();
    inject(UiService).showQuestion(
      "¿Estás seguro de que quieres abandonar la página? Se perderán los cambios no guardados.",
      () => deactivateSubject.next(true),
      () => deactivateSubject.next(false)
    );
    return deactivateSubject;
  }
  return true;
};
