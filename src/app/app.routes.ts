import { Routes } from "@angular/router";
import { FormComponent } from "./pages/form/form.component";
import { HomeComponent } from "./pages/home/home.component";
import { UnsavedChangesGuard } from "./guards/deactivate/unsaved-changes.guard";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "form",
    canDeactivate: [UnsavedChangesGuard],
    component: FormComponent
  }
];
