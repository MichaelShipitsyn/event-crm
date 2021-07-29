import {
  Box,
  Divider,
  Hidden,
  Link,
  List,
} from '@material-ui/core';
import { Logo } from 'components/Logo';
import type { FC, ReactNode } from 'react';
import React, { useEffect } from 'react';
import { Users as UsersIcon } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useSelector } from 'react-redux';
import { Link as RouterLink, matchPath, useLocation } from 'react-router-dom';
import { RootState } from 'store';
import { getUserFullName } from 'store/auth/selector';

import { NavItem } from './NavItem';
import { StyledAvatar, StyledDesktopDrawer, StyledList,StyledMobileDrawer } from './styled'

type ReduceChildRoutesProps = {
  acc: any[];
  pathname: string;
  item: Item;
  depth: number;
};

type RenderNavItemsProps = {
  items: Item[];
  pathname: string;
  depth?: number;
};

interface NavBarProps {
  onMobileClose: () => void;
  openMobile: boolean;
}

interface Item {
  href?: string;
  icon?: ReactNode;
  info?: ReactNode;
  items?: Item[];
  title: string;
}

interface Section {
  items: Item[];
  subheader?: string;
}

const sections: Section[] = [
  {
    subheader: 'Сотрудники',
    items: [
      {
        title: 'Сотрудники',
        icon: UsersIcon,
        href: '/app/employees',
      },
    ],
  },
  {
    subheader: 'Клиенты',
    items: [
      {
        title: 'Клиенты',
        icon: UsersIcon,
        href: '/app/clients',
      },
    ],
  },
  {
    subheader: 'Заказы',
    items: [
      {
        title: 'Заказы',
        icon: UsersIcon,
        href: '/app/orders',
      },
    ],
  },
];

const reduceChildRoutes = ({
  acc,
  pathname,
  item,
  depth,
}: ReduceChildRoutesProps) => {
  const key = `${item.title}${depth}`;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    );
  }

  return acc;
};

function renderNavItems({ items, pathname, depth = 0 }: RenderNavItemsProps) {
  return (
    <List disablePadding>
      {items.reduce(
        (accumulator, item) =>
          // @ts-expect-error
          reduceChildRoutes({ acc: accumulator, item, pathname, depth }),
        []
      )}
    </List>
  );
}

export const NavBar: FC<NavBarProps> = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);
  const userFullName = useSelector(getUserFullName);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname, onMobileClose, openMobile]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box p={2} display="flex" justifyContent="center">
            <RouterLink to="/">
              <Logo />
            </RouterLink>
          </Box>
        </Hidden>
        <Box p={2}>
          <Box display="flex" justifyContent="center">
            <RouterLink to="/app/account">
              <StyledAvatar
                alt="User"
                src={user?.avatar ?? ''}
              />
            </RouterLink>
          </Box>
          <Box mt={2} textAlign="center">
            <Link
              component={RouterLink}
              to="/app/account"
              variant="h5"
              color="textPrimary"
              underline="none"
            >
              {userFullName}
            </Link>
          </Box>
        </Box>
        <Divider />
        <Box p={2}>
          {sections.map((section) => (
            <StyledList key={section.subheader}>
              {renderNavItems({
                items: section.items,
                pathname: location.pathname,
              })}
            </StyledList>
          ))}
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <StyledMobileDrawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </StyledMobileDrawer>
      </Hidden>
      <Hidden mdDown>
        <StyledDesktopDrawer
          anchor="left"
          open
          variant="persistent"
        >
          {content}
        </StyledDesktopDrawer>
      </Hidden>
    </>
  );
};
