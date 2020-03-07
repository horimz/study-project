const mediaQuery = (maxWidth: number) => `
  @media (max-width: ${maxWidth}px)
`;

const media = {
  xxlarge: mediaQuery(1920), // Desktop displays
  xlarge: mediaQuery(1440), // Laptop displays
  medium: mediaQuery(1024), // Tablet landscape
  small: mediaQuery(834), // Tablet portrait
  xsmall: mediaQuery(736), // Mobile landscape
  xxsmall: mediaQuery(375), // Mobile portrait
  custom: mediaQuery
};

export { media };
