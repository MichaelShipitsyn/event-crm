import type { FC, ReactNode } from 'react';
import React, { useState } from 'react';

import { NavBar } from './NavBar';
import { Container, ContentContainer, StyledContent,StyledWrapper } from './styled'
import { TopBar } from './TopBar';

interface DashboardLayoutProps {
  children?: ReactNode;
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const [isMobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  return (
    <Container>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <StyledWrapper>
        <ContentContainer>
          <StyledContent>{children}</StyledContent>
        </ContentContainer>
      </StyledWrapper>
    </Container>
  );
};
