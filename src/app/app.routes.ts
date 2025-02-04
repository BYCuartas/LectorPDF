import { LayoutComponent } from './layouts/layout/layout.component';
import { VexRoutes } from '@vex/interfaces/vex-route.interface';
import { LectorPdfComponent } from './layouts/components/lector-pdf/lector-pdf.component';
export const appRoutes: VexRoutes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'lector-pdf', component: LectorPdfComponent,
      }
    ]
  }
];
