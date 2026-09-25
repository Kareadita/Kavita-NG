import { Routes } from '@angular/router';
import { NAV_GROUPS } from './nav';

export const routes: Routes = [
  ...NAV_GROUPS.flatMap((group) => group.sections).map((section) => ({
    path: section.path,
    title: section.path ? `${section.label} | Kavita-NG` : 'Kavita-NG',
    loadComponent: section.loadComponent,
  })),
  { path: '**', redirectTo: '' },
];
