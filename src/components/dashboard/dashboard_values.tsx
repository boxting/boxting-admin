import { Module, SidebarData } from '@/components/sidebar';
import React from 'react';

import {
  GanttChartIcon,
  TableIcon,
  ParticipantIcon,
  BookIcon,
} from '@/components/icons';
import { CheckIcon } from '@chakra-ui/icons';

export const DEFAULT_SIDEBAR: SidebarData = {
  logo: {
    expanded: `/images/logo/rsz_boxting_logo.png`,
    collapsed: `/images/logo/boxting_icon_white.png`,
  },
  content: [
    {
      label: `Votaciones`,
      modules: [
        {
          icon: <CheckIcon />,
          name: `Votaciones`,
          route: `/events`,
          // active: router.pathname === "/organization",
        },
      ] as Module[],
    },

    // {
    //   label: `Estructura salarial`,
    //   modules: [
    //     {
    //       icon: <GanttChartIcon />,
    //       name: `Broadbanding`,
    //       route: `/broadbanding`,
    //       // active: router.pathname === "/broadbanding",
    //     },
    //     {
    //       icon: <TableIcon />,
    //       name: `Matricial`,
    //       route: `/matricial`,
    //       // active: router.pathname === "/matricial",
    //     },
    //   ] as Module[],
    // },
    // {
    //   label: `Políticas salariales`,
    //   modules: [
    //     {
    //       icon: <BookIcon />,
    //       name: `Políticas`,
    //       route: `/salarypolicies`,
    //       // active: router.pathname === "/salarypolicies",
    //     },
    //   ] as Module[],
    // },
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
