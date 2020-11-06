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
      label: `Eventos de votación`,
      modules: [
        {
          icon: <CheckIcon />,
          name: `Votaciones`,
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
