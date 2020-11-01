import { Box, Text, Flex, Center } from '@chakra-ui/core';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const SidebarItem = motion.custom(Box);

const COLLAPSED_WIDTH = `80px`;
const EXPANDED_WIDTH = `220px`;

interface Variant {
  width: string;
}

export const SidebarVariants = {
  expanded: (): Variant => ({
    width: EXPANDED_WIDTH,
  }),
  collapsed: (): Variant => ({
    width: COLLAPSED_WIDTH,
  }),
};

const BACKGROUND_COLOR = `#fff`;
const SIDEBAR_COLOR = `#fff`;
const LINE_COLOR = `#d9dbe1`;

export interface Module {
  icon: React.ReactNode;
  name: string;
  route?: string;
  active: boolean;
}

export interface SidebarItem {
  label: string;
  modules: Module[];
}

export interface SidebarLogo {
  expanded: string;
  collapsed: string;
}

export interface SidebarData {
  logo: SidebarLogo;
  content: SidebarItem[];
}
interface SidebarProps {
  color?: string;
  width?: number | string;
  isOpen: boolean;
  // setOpen: (value: boolean) => void;
  data: SidebarData;
}

const Sidebar: React.FC<SidebarProps> = ({
  data,
  color = `#fff`,
  isOpen = false,
}: SidebarProps) => {
  const router = useRouter();

  // TODO: This isn't the best solution to persist the sidebar layout
  // const [open, setOpen] = useState(
  //     process.browser
  //         ? localStorage.getItem("fairpay.sidebar.open") === "true"
  //         : false
  // );

  // useEffect(() => {
  //     if (process.browser)
  //         localStorage.setItem("fairpay.sidebar.open", isOpen.toString());
  // }, [isOpen]);

  // useEffect(() => {
  //     setOpen(localStorage.getItem("fairpay.sidebar.open") === "true");
  // }, [isOpen]);

  const open = isOpen;

  return (
    <motion.div
      initial={open ? `expanded` : `collapsed`}
      animate={open ? `expanded` : `collapsed`}
      variants={SidebarVariants}
      style={{
        display: `flex`,
        position: `relative`,
        flexDirection: `column`,
        backgroundColor: color,
        boxShadow: `inset -7px 0 0 -6px ${LINE_COLOR}`,
        overflowY: `scroll`,
      }}
    >
      <Box>
        <Flex
          height={70}
          width="100%"
          alignItems="center"
          mt={5}
          mb={open ? 10 : 16}
          position="sticky"
        >
          <Center>
            <img
              src={open ? data.logo.expanded : data.logo.collapsed}
              alt="Boxting Logo"
              height="10px"
              width="100%"
            />
          </Center>
        </Flex>
        {data.content.map((group, i) => (
          <>
            {open && (
              <Text pl={8} pr={2} textTransform="uppercase" textStyle="label">
                {group.label}
              </Text>
            )}
            {group.modules
              .map((m) => ({
                ...m,
                active:
                  router.pathname === (m.route || `/${m.name.toLowerCase()}`),
              }))
              .map((module, i) => {
                const iconReactObject = React.cloneElement(
                  module.icon as React.ReactElement,
                  {
                    boxSize: 4,
                    color: module.active ? `primary` : `lightText.200`,
                  },
                );
                return (
                  <SidebarItem
                    key={i}
                    onClick={() =>
                      router.push(
                        module.route || `/${module.name.toLowerCase()}`,
                      )
                    }
                    style={
                      open
                        ? module.active
                          ? {
                              backgroundColor: SIDEBAR_COLOR,
                              cursor: `auto`,
                              borderRightWidth: 0,
                              borderRightColor: SIDEBAR_COLOR,
                              borderTopLeftRadius: `30px`,
                              borderBottomLeftRadius: `30px`,
                              borderLeftWidth: 1,
                              borderLeftColor: LINE_COLOR,
                              borderTopWidth: 1,
                              borderTopColor: LINE_COLOR,
                              borderBottomWidth: 1,
                              borderBottomColor: LINE_COLOR,
                              alignItems: `flex-start`,
                              paddingLeft: 32,
                              marginLeft: `0.5rem`,
                              marginTop: `1rem`,
                              marginBottom: `1rem`,
                              paddingTop: `1rem`,
                              paddingBottom: `1rem`,
                            }
                          : {
                              backgroundColor: BACKGROUND_COLOR,
                              cursor: `pointer`,
                              borderRightWidth: 1,
                              borderRightColor: LINE_COLOR,
                              borderTopLeftRadius: 0,
                              borderBottomLeftRadius: 0,
                              borderLeftWidth: 0,
                              borderLeftColor: SIDEBAR_COLOR,
                              borderTopWidth: 0,
                              borderTopColor: SIDEBAR_COLOR,
                              borderBottomWidth: 1,
                              borderBottomColor: SIDEBAR_COLOR,
                              alignItems: `flex-start`,
                              paddingLeft: 32,
                              marginLeft: `0.5rem`,
                              marginTop: `1rem`,
                              marginBottom: `1rem`,
                              paddingTop: `1rem`,
                              paddingBottom: `1rem`,
                            }
                        : module.active
                        ? {
                            backgroundColor: SIDEBAR_COLOR,
                            cursor: `auto`,
                            borderRightWidth: 0,
                            borderRightColor: SIDEBAR_COLOR,
                            borderTopLeftRadius: `30px`,
                            borderBottomLeftRadius: `30px`,
                            borderLeftWidth: 1,
                            borderLeftColor: LINE_COLOR,
                            borderTopWidth: 1,
                            borderTopColor: LINE_COLOR,
                            borderBottomWidth: 1,
                            borderBottomColor: LINE_COLOR,
                            alignItems: `center`,
                            paddingLeft: 0,
                            marginTop: `1.2rem`,
                            marginBottom: `1.2rem`,
                            paddingTop: `1rem`,
                            paddingBottom: `1rem`,
                          }
                        : {
                            backgroundColor: BACKGROUND_COLOR,
                            cursor: `pointer`,
                            borderRightWidth: 1,
                            borderRightColor: LINE_COLOR,
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderLeftWidth: 0,
                            borderLeftColor: SIDEBAR_COLOR,
                            borderTopWidth: 0,
                            borderTopColor: SIDEBAR_COLOR,
                            borderBottomWidth: 1,
                            borderBottomColor: SIDEBAR_COLOR,
                            alignItems: `center`,
                            paddingLeft: 0,
                            marginTop: `1.2rem`,
                            marginBottom: `1.2rem`,
                            paddingTop: `1rem`,
                            paddingBottom: `1rem`,
                          }
                    }
                    position="relative"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    _before={
                      module.active && {
                        content: `''`,
                        position: `absolute`,
                        top: `-20px`,
                        right: 0,
                        width: `20px`,
                        height: `20px`,
                        borderBottomRightRadius: `50%`,
                        borderBottomWidth: `1px`,
                        borderRightWidth: `1px`,
                        borderBottomColor: LINE_COLOR,
                        borderRightColor: LINE_COLOR,
                        boxShadow: `0 10px 0 0 ${BACKGROUND_COLOR}`,
                      }
                    }
                    _after={
                      module.active && {
                        content: `''`,
                        position: `absolute`,
                        bottom: `-20px`,
                        right: 0,
                        width: `20px`,
                        height: `20px`,
                        borderTopRightRadius: `50%`,
                        borderTopWidth: `1px`,
                        borderRightWidth: `1px`,
                        borderTopColor: LINE_COLOR,
                        borderRightColor: LINE_COLOR,
                        boxShadow: `0 -10px 0 0 ${BACKGROUND_COLOR}`,
                      }
                    }
                  >
                    <Flex alignItems="center" justifyContent="flex-start">
                      {iconReactObject}
                      {open && (
                        <Text
                          pl={3}
                          color={module.active ? `#18191F` : `#656565`}
                          fontWeight={module.active ? 600 : 400}
                          fontSize="0.95rem"
                        >
                          {module.name}
                        </Text>
                      )}
                    </Flex>
                  </SidebarItem>
                );
              })}
          </>
        ))}
      </Box>
    </motion.div>
  );
};

export { Sidebar };
