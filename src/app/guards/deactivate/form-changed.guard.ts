import { CanDeactivateFn, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export type TCanComponentLeaveRoute =
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree;

export interface CanComponentLeaveRoute {
  canDeactivate: () => TCanComponentLeaveRoute;
}

export const FormChangedGuard: CanDeactivateFn<CanComponentLeaveRoute> = (
  component: CanComponentLeaveRoute
) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
