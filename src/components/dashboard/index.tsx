import React, { useEffect, useState } from 'react';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Icon, Menu, MenuButton, MenuItem, MenuList, useToast } from '@chakra-ui/core';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import HamburguerButton from '@/components/buttons/hamburguer';
import { Sidebar } from '../sidebar';

import { UserCircleIcon, BellIcon } from '../icons';
import { breadcrumbItems, COLLAB_SIDEBAR, DEFAULT_SIDEBAR } from './dashboard_values';
import { showToast } from '../toast/custom.toast';
import { LoginRepository } from '@/data/login/repository/login.repository';
import CookiesManager from '@/data/utils/cookies.manager';
import { CryptoManager } from '@/data/utils/crypto.manager';
import boxtingTheme from '@/theme/theme';

const BACKGROUND_COLOR = boxtingTheme.colors.background;

const Content = motion.custom(Box);

interface LayoutProps {
    children: React.ReactElement | Element | string;
}

interface Routes {
    [key: string]: string;
}

interface CustomBreadcumbProps {
    pathname: string;
    breadcrumbItems: (routes: string[]) => string[];
}

const CustomBreadcumb: React.FC<CustomBreadcumbProps> = ({
    pathname,
    breadcrumbItems,
}: CustomBreadcumbProps) => {
    const elements = pathname.split(`/`).slice(1);
    console.log(elements)
    console.log(breadcrumbItems(elements))
    return (
        <Breadcrumb>
            {breadcrumbItems(elements).map((value, i) => (
                <BreadcrumbItem key={i}>
                    <BreadcrumbLink>{value}</BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
};

const PlatformLayout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
    const [isOpen, setOpen] = useState<boolean>(true);
    const router = useRouter();
    const toast = useToast();

    // Get service instance
    const loginRepository = LoginRepository.getInstance()
    const cookiesManager = CookiesManager.getInstance()

    const [userRole, setUserRole] = useState<string | undefined>('')

    useEffect(() => {
        if(userRole == ''){
            let value = CookiesManager.getInstance()._getRole()
            value = CryptoManager.getInstance().decrypt(value)
            setUserRole(value)
        }
    }, [])

    const onLogout = async () => {
        try {

            const refresh = cookiesManager._getRefreshToken();
            // Delete request
            await loginRepository.logout(refresh);

            // Delete tokens
            cookiesManager._clearToken();

            // Go to events page
            router.push('/login');

            // Show success toast
            showToast('Éxito', 'Sesión cerrada correctamente.',
                true, toast);

        } catch (error) {
            showToast('Ocurrió un error', error, false, toast);
        }
    }

    return (
        <Box
            display="flex"
            minWidth="0"
            height="100vh"
            backgroundColor={BACKGROUND_COLOR}
            overflowY="hidden"
        >
            <Sidebar isOpen={isOpen} data={(userRole == "COLLABORATOR") ? COLLAB_SIDEBAR : DEFAULT_SIDEBAR} />
            <Content
                position="relative"
                display="flex"
                flexDirection="column"
                flex={1}
                backgroundColor={BACKGROUND_COLOR}
            >
                <Box
                    position="sticky"
                    left={0}
                    right={0}
                    top={0}
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    width="100%"
                    p="8px"
                    bg="white"
                    borderBottomWidth={1}
                    borderBottomStyle="solid"
                    borderBottomColor="#d9dbe1"
                >
                    <HamburguerButton isOpen={isOpen} setOpen={setOpen} />
                    <Box pl={1}>
                        <CustomBreadcumb
                            pathname={router.asPath}
                            breadcrumbItems={breadcrumbItems}
                        />
                    </Box>
                </Box>

                <Box
                    position="relative"
                    height='100%'
                    zIndex={0}
                    overflowX="hidden"
                    py={10}
                    pl={[4, 4, 6, 12]}
                    pr={[4, 4, 6, 10]}
                // mt={"3.7rem"}
                >
                    {children}
                </Box>
            </Content>

            <Box
                position="relative"
                borderLeft="1px solid #d9dbe1"
                display="flex"
                flexDirection="column"
                paddingTop="55px"
                width={['50px', '60px']}
            >
                <Box
                    marginBottom="35px"
                    display="flex"
                    flexDirection="column"
                    gridRowGap={6}
                    alignItems="center"
                    background="#ffffff"
                >
                    <Menu>
                        <MenuButton as={Box}>
                            <UserCircleIcon boxSize={5} color="#bbbbbb" />
                        </MenuButton>
                        <MenuList>
                            <MenuItem
                                onClick={onLogout}
                            >
                                Cerrar sesión
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </Box>
        </Box>
    );
};

export default PlatformLayout;
