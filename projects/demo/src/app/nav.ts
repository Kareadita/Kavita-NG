import { Type } from '@angular/core';

export interface NavSection {
  path: string;
  label: string;
  loadComponent: () => Promise<Type<unknown>>;
}

export interface NavGroup {
  label: string;
  sections: NavSection[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Getting started',
    sections: [
      {
        path: '',
        label: 'Overview',
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
      },
      {
        path: 'tokens',
        label: 'Tokens',
        loadComponent: () => import('./pages/tokens/tokens').then((m) => m.Tokens),
      },
    ],
  },
  {
    label: 'Foundations',
    sections: [
      {
        path: 'typography',
        label: 'Typography',
        loadComponent: () => import('./pages/typography/typography').then((m) => m.Typography),
      },
    ],
  },
  {
    label: 'Actions',
    sections: [
      {
        path: 'buttons',
        label: 'Buttons',
        loadComponent: () => import('./pages/buttons/buttons').then((m) => m.Buttons),
      },
    ],
  },
  {
    label: 'Forms',
    sections: [
      {
        path: 'inputs',
        label: 'Inputs',
        loadComponent: () => import('./pages/inputs/inputs').then((m) => m.Inputs),
      },
      {
        path: 'checks-and-radios',
        label: 'Checks and radios',
        loadComponent: () =>
          import('./pages/checks-and-radios/checks-and-radios').then((m) => m.ChecksAndRadios),
      },
      {
        path: 'range',
        label: 'Range',
        loadComponent: () => import('./pages/range/range').then((m) => m.Range),
      },
    ],
  },
  {
    label: 'Navigation',
    sections: [
      {
        path: 'tabs',
        label: 'Tabs',
        loadComponent: () => import('./pages/tabs/tabs').then((m) => m.Tabs),
      },
      {
        path: 'pagination',
        label: 'Pagination',
        loadComponent: () => import('./pages/pagination/pagination').then((m) => m.Pagination),
      },
      {
        path: 'breadcrumb',
        label: 'Breadcrumb',
        loadComponent: () => import('./pages/breadcrumb/breadcrumb').then((m) => m.Breadcrumb),
      },
      {
        path: 'dropdown',
        label: 'Dropdown',
        loadComponent: () => import('./pages/dropdown/dropdown').then((m) => m.Dropdown),
      },
    ],
  },
  {
    label: 'Feedback',
    sections: [
      {
        path: 'alerts',
        label: 'Alerts',
        loadComponent: () => import('./pages/alerts/alerts').then((m) => m.Alerts),
      },
      {
        path: 'badges',
        label: 'Badges',
        loadComponent: () => import('./pages/badges/badges').then((m) => m.Badges),
      },
      {
        path: 'progress',
        label: 'Progress',
        loadComponent: () => import('./pages/progress/progress').then((m) => m.Progress),
      },
    ],
  },
  {
    label: 'Layout',
    sections: [
      {
        path: 'accordion',
        label: 'Accordion',
        loadComponent: () => import('./pages/accordion/accordion').then((m) => m.Accordion),
      },
      {
        path: 'list-group',
        label: 'List group',
        loadComponent: () => import('./pages/list-group/list-group').then((m) => m.ListGroup),
      },
      {
        path: 'table',
        label: 'Table',
        loadComponent: () => import('./pages/table/table').then((m) => m.Table),
      },
    ],
  },
  {
    label: 'Overlays',
    sections: [
      {
        path: 'modal',
        label: 'Modal',
        loadComponent: () => import('./pages/modal/modal').then((m) => m.Modal),
      },
      {
        path: 'drawer',
        label: 'Drawer',
        loadComponent: () => import('./pages/drawer/drawer').then((m) => m.Drawer),
      },
      {
        path: 'popover-and-tooltip',
        label: 'Popover and tooltip',
        loadComponent: () =>
          import('./pages/popover-and-tooltip/popover-and-tooltip').then(
            (m) => m.PopoverAndTooltip,
          ),
      },
    ],
  },
  {
    label: 'Utilities',
    sections: [
      {
        path: 'utilities',
        label: 'Utilities',
        loadComponent: () => import('./pages/utilities/utilities').then((m) => m.Utilities),
      },
    ],
  },
];
