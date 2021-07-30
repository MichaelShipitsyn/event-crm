import { Collapse } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import type { FC, ReactNode } from 'react';
import React, { useState } from 'react';
import {
  LinkProps as RouterLinkProps,
  NavLink as RouterLink,
} from 'react-router-dom';

import {
  StyledButton,
  StyledButtonLeaf,
  StyledListItem,
  StyledTitle,
} from './styled';

interface NavItemProps {
  children?: ReactNode;
  className?: string;
  depth: number;
  href?: string;
  icon?: any;
  info?: any;
  open?: boolean;
  title: string;
}

export const NavItem: FC<NavItemProps> = ({
  children,
  className,
  depth,
  href,
  icon: Icon,
  info: Info,
  open: openProperty,
  title,
  ...rest
}) => {
  const [open, setOpen] = useState<boolean>(!!openProperty);

  const handleToggle = (): void => {
    setOpen((previousOpen) => !previousOpen);
  };

  let paddingLeft = 15;

  if (depth > 0) {
    paddingLeft = 32 + 15 * depth;
  }

  const style = { paddingLeft };

  if (children) {
    return (
      <StyledListItem disableGutters key={title} button {...rest}>
        <StyledButton onClick={handleToggle} style={style}>
          {Icon && <Icon size="20" />}
          <StyledTitle>{title}</StyledTitle>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </StyledButton>
        <Collapse in={open}>{children}</Collapse>
      </StyledListItem>
    );
  }

  const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, 'to'>>(
    (props, ref) => (
      <RouterLink
        ref={ref}
        exact
        to={href ?? ''}
        activeClassName="navItemActive"
        {...props}
      />
    )
  );

  return (
    <StyledListItem disableGutters key={title} button {...rest}>
      <StyledButtonLeaf
        // @ts-expect-error
        component={LinkBehavior}
        style={style}
      >
        {Icon && <Icon size="20" />}
        <StyledTitle>{title}</StyledTitle>
        {Info && <Info />}
      </StyledButtonLeaf>
    </StyledListItem>
  );
};
