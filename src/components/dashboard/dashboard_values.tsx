import { Module, SidebarData } from '@/components/sidebar';
import React from 'react';
import { EmojiEventsOutlined, EventOutlined, ListAltOutlined, PeopleAltOutlined, PersonOutlined } from '@material-ui/icons';

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
                    icon: <EventOutlined />,
                    name: `Eventos de votación`,
                    route: `/events`,
                },
            ] as Module[],
        },
        {
            label: `Gestión de elecciones`,
            modules: [
                {
                    icon: <ListAltOutlined />,
                    name: `Actividades de elección`,
                    route: `/elections`,
                },
            ] as Module[],
        },
        {
            label: `Gestión de usuarios`,
            modules: [
                {
                    icon: <PersonOutlined />,
                    name: `Colaboradores`,
                    route: `/collaborators`,
                },
                {
                    icon: <PeopleAltOutlined/>,
                    name: `Votantes`,
                    route: `/voters`,
                }
            ] as Module[],
        },
        {
            label: `Gestión de resultados`,
            modules: [
                {
                    icon: <EmojiEventsOutlined />,
                    name: `Resultados`,
                    route: `/results`,
                }
            ] as Module[],
        }
    ],
};

export const COLLAB_SIDEBAR: SidebarData = {
    logo: {
        expanded: `/images/logo/rsz_boxting_logo.png`,
        collapsed: `/images/logo/boxting_icon_white.png`,
    },
    content: [
        {
            label: `Gestión de eventos`,
            modules: [
                {
                    icon: <EventOutlined />,
                    name: `Eventos de votación`,
                    route: `/events`,
                },
            ] as Module[],
        },
        {
            label: `Gestión de elecciones`,
            modules: [
                {
                    icon: <ListAltOutlined />,
                    name: `Actividades de elección`,
                    route: `/elections`,
                },
            ] as Module[],
        },
        {
            label: `Gestión de usuarios`,
            modules: [
                {
                    icon: <PeopleAltOutlined/>,
                    name: `Votantes`,
                    route: `/voters`,
                }
            ] as Module[],
        },
        {
            label: `Gestión de resultados`,
            modules: [
                {
                    icon: <EmojiEventsOutlined />,
                    name: `Resultados`,
                    route: `/results`,
                }
            ] as Module[],
        }
    ],
};

export const breadcrumbItems = (routes: string[]): string[] => {

    if (routes.length === 1) {
        if (routes[0] === 'events') {
            return ['Eventos']
        }
        if (routes[0] === 'elections') {
            return ['Elecciones']
        }
        if (routes[0] === 'collaborators') {
            return ['Colaboradores']
        }
        if (routes[0] === 'voters') {
            return ['Votantes']
        }
        if (routes[0] === 'results') {
            return ['Resultados']
        }
    } else if (routes.length === 2) {
        if (routes[0] === 'events') {
            if (routes[1] === 'create') {
                return ['Eventos', 'Crear']
            } else {
                return ['Evento', routes[1]]
            }
        }else if (routes[0] === 'results') {
            return ['Resultados', routes[1]]
        }
    } else if (routes.length === 3) {
        if (routes[0] == 'events') {
            if (routes[2] === 'codes') {
                return ['Evento', routes[1], 'Códigos']
            } else if (routes[2] === 'update') {
                return ['Evento', routes[1], 'Actualizar']
            }
        } else if (routes[0] == 'elections') {
            if (routes[2] == 'lists') {
                return ['Elección', routes[1], 'Listas']
            } else if (routes[2] == 'candidates') {
                return ['Elección', routes[1], 'Candidatos']
            }
        }
    } else if (routes.length === 4) {
        if (routes[0] === 'events') {
            if (routes[2] === 'elections') {
                if (routes[3] === 'create') {
                    return ['Evento', routes[1], 'Elecciones', 'Crear']
                } else {
                    return ['Evento', routes[1], 'Elección', routes[3]]
                }
            }
        } else if (routes[0] == 'elections') {
            if (routes[2] == 'lists') {
                if (routes[3] === 'create') {
                    return ['Elección', routes[1], 'Listas', 'Crear']
                } else {
                    return ['Elección', routes[1], 'Lista', routes[3]]
                }
            }else if (routes[2] == 'candidates') {
                if (routes[3] === 'create') {
                    return ['Elección', routes[1], 'Candidatos', 'Crear']
                }else {
                    return ['Elección', routes[1], 'Candidato', routes[3]]
                }
            }
        }
    } else if (routes.length === 5) {
        if (routes[0] === 'events') {
            if (routes[2] === 'elections') {
                if (routes[4] === 'update') {
                    return ['Evento', routes[1], 'Elecciones', routes[3], 'Actualizar']
                }
            }
        } else if (routes[0] == 'elections') {
            if (routes[2] == 'lists') {
                if (routes[4] === 'update') {
                    return ['Elección', routes[1], 'Lista', routes[3], 'Actualizar']
                }
            } else if (routes[2] == 'candidates') {
                if (routes[4] === 'update') {
                    return ['Elección', routes[1], 'Candidato', routes[3], 'Actualizar']
                }
            }
        }
    }
}