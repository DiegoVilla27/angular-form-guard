import { Routes } from "@angular/router";
import { FormComponent } from "./pages/form/form.component";
import { HomeComponent } from "./pages/home/home.component";
import { FormChangedGuard } from "./guards/deactivate/form-changed.guard";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "form",
    canDeactivate: [FormChangedGuard],
    component: FormComponent
  }
];
