import React, { useState } from 'react';
import { Box, Breadcrumb, BreadcrumbItem } from '@chakra-ui/core';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import HamburguerButton from '@/components/buttons/hamburguer';
import { Sidebar } from '../sidebar';

import { UserCircleIcon, BellIcon } from '../icons';
import { DEFAULT_BREADCRUMBS, DEFAULT_SIDEBAR } from './dashboard_values';

const BACKGROUND_COLOR = `#fff`;

const Content = motion.custom(Box);

interface LayoutProps {
  children: React.ReactElement | Element | string;
}

interface Routes {
  [key: string]: string;
}

interface CustomBreadcumbProps {
  pathname: string;
  routes: Routes;
}

const CustomBreadcumb: React.FC<CustomBreadcumbProps> = ({
  pathname,
  routes,
}: CustomBreadcumbProps) => {
  const elements = pathname.split(`/`);
  return (
    <Breadcrumb>
      {elements.map((value) => (
        <BreadcrumbItem>{routes[value]}</BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

const PlatformLayout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  const [isOpen, setOpen] = useState<boolean>(true);
  const router = useRouter();

  return (
    <Box
      display="flex"
      minWidth="0"
      height="100vh"
      backgroundColor={BACKGROUND_COLOR}
      overflowY="hidden"
    >
      <Sidebar isOpen={isOpen} data={DEFAULT_SIDEBAR} />
      <Content
        position="relative"
        display="flex"
        flexDirection="column"
        flex={1}
        backgroundColor={BACKGROUND_COLOR}
        overflowY="scroll"
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
              pathname={router.pathname}
              routes={DEFAULT_BREADCRUMBS}
            />
          </Box>
        </Box>
        <Box
          position="relative"
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
        width="60px"
      >
        <Box
          marginBottom="35px"
          display="flex"
          flexDirection="column"
          gridRowGap={6}
          alignItems="center"
          background="#ffffff"
        >
          <UserCircleIcon boxSize={5} color="#bbbbbb" />
        </Box>
        <Box
          marginBottom="35px"
          display="flex"
          flexDirection="column"
          gridRowGap={6}
          alignItems="center"
        >
          <BellIcon boxSize={5} color="#bbbbbb" />
        </Box>
      </Box>
    </Box>
  );
};

export default PlatformLayout;
