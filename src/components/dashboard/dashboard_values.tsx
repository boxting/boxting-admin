import { Module, SidebarData } from '@/components/sidebar';
import React from 'react';

import { CheckIcon } from '@chakra-ui/icons';

export const DEFAULT_SIDEBAR: SidebarData = {
  logo: {
    expanded: `/images/logo/rsz_boxting_logo.png`,
    collapsed: `/images/logo/boxting_icon_white.png`,
  },
  content: [
    {
      label: `Gestión de eventos`,
      modules: [
        {
          icon: <CheckIcon />,
          name: `Eventos de votación`,
          route: `/events`,
        },
      ] as Module[],
    },
  ],
};

export const DEFAULT_BREADCRUMBS = {
  organization: `Organización`,
  workers: `Trabajadores`,
  jobdescription: `Descripción de Puestos`,
  assessment: `Valoración`,
  equity: `Equidad`,
  broadbanding: `Broadbanding`,
  matricial: `Matricial`,
  salarypolicies: `Políticas`,
  structure: `Estructura organizacional y puestos`,
  fundamentals: `Fundamentos`,
  position: `Puesto`,
};

export const breadcrumbItems = (routes: string[]): string[] => {
  if (routes.length === 1) {
    if (routes[0] === 'events') {
      return ['Eventos']
    }
  } else if (routes.length === 2) {
    if (routes[1] === 'create') {
      return ['Eventos', 'Crear']
    } else {
      return ['Evento', routes[1]]
    }
  } else if (routes.length === 3) {
    if (routes[2] === 'codes') {
      return ['Evento', routes[1], 'Códigos']
    } else if (routes[2] === 'update') {
      return ['Evento', routes[1], 'Actualizar']
    }
  }
}