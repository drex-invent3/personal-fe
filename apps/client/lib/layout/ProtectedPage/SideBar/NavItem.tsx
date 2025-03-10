import {
  Collapse,
  ComponentWithAs,
  HStack,
  Icon,
  IconProps,
  Link,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { ChevronDownIcon } from '~/lib/components/CustomIcons';
import { sidebarChildren } from '~/lib/interfaces/general.interfaces';

interface NavItemProps {
  name: string;
  route: string;
  icon: ComponentWithAs<'svg', IconProps>;
  isCollapse: boolean;
  children?: sidebarChildren[];
  hasAnyChildren?: boolean;
}

const NavItem = (props: NavItemProps) => {
  const { name, route, icon, isCollapse, children, hasAnyChildren } = props;
  const { isOpen, onToggle } = useDisclosure();
  const path = usePathname();
  const splittedPathname = path.split('/');
  const { data, update } = useSession();

  //For nav items with children
  const fullPath = window.location.href.split(
    `${process.env.NEXT_PUBLIC_BASE_URL}/`
  );
  const relativePath = fullPath?.[1];

  return (
    <VStack
      width="full"
      position="relative"
      px="12px"
      alignItems={hasAnyChildren ? 'flex-start' : 'center'}
    >
      <HStack
        rounded="8px"
        bgColor={
          children && splittedPathname[1] === route ? '#6E7D8E80' : 'none'
        }
        spacing={0}
        width={isCollapse ? 'max-content' : 'full'}
        position="relative"
        py={children ? '12px' : 0}
        pl={children ? '12px' : 0}
      >
        <HStack
          bgColor={
            splittedPathname[1] === route && !children ? '#6E7D8E80' : 'none'
          }
          spacing="16px"
          rounded="8px"
          py={!children ? '12px' : 0}
          pl={!children ? '12px' : 0}
          pr={!children ? '12px' : 0}
          width={isCollapse ? 'max-content' : 'full'}
          cursor="pointer"
          onClick={() =>
            update({
              user: {
                ...data?.user,
                managedCompanySlug: null,
              },
            })
          }
          {...(!children
            ? { as: 'a', href: `/${route}` }
            : {
                as: 'button',
                onClick: () => {
                  onToggle();
                  update({
                    user: {
                      ...data?.user,
                      managedCompanySlug: null,
                    },
                  });
                },
              })}
        >
          <Icon
            as={icon}
            boxSize="16px"
            color={splittedPathname[1] === route ? 'white' : 'neutral.600'}
            _groupHover={{ color: 'white' }}
          />
          {!isCollapse && (
            <Text
              color={splittedPathname[1] === route ? 'white' : 'neutral.600'}
              size="md"
              fontWeight={splittedPathname[1] === route ? 700 : 500}
              whiteSpace="nowrap"
              _groupHover={{ color: 'white', fontWeight: 700 }}
            >
              {name}
            </Text>
          )}
        </HStack>

        <Icon
          as={ChevronDownIcon}
          color="neutral.600"
          boxSize="16px"
          visibility={children && children?.length > 0 ? 'visible' : 'hidden'}
          display={!children ? 'none' : 'flex'}
          mx="8px"
          transition="transform 0.3s ease-out"
          transform={isOpen ? 'rotate(-180deg)' : 'rotate(0deg)'}
        />
      </HStack>
      <Collapse
        in={isOpen && !isCollapse}
        style={{ width: '100%', paddingLeft: '20px' }}
      >
        <VStack
          width="full"
          spacing={0}
          pl="19px"
          borderLeft="1px solid #656565"
        >
          {children?.map((item, index) => (
            <Link
              href={`/${item.route}`}
              minW="full"
              textDecoration="none !important"
              key={index}
              onClick={() =>
                update({
                  user: {
                    ...data?.user,
                    managedCompanySlug: null,
                  },
                })
              }
            >
              <Text
                key={index}
                px="8px"
                py="12px"
                rounded="8px"
                width="full"
                bgColor={
                  splittedPathname[1] === item.route ? '#6E7D8E80' : 'none'
                }
                color={relativePath === item.route ? 'white' : 'neutral.600'}
              >
                {item.name}
              </Text>
            </Link>
          ))}
        </VStack>
      </Collapse>
    </VStack>
  );
};

export default NavItem;
