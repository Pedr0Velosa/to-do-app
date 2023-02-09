import React from "react";
import NextLink from "next/link";
import MuiLink from "@mui/material/Link";

type LinkProps = {
  href: string;
  children: React.ReactNode;
};

const Link = ({ href, children }: LinkProps) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <MuiLink variant="body2">{children}</MuiLink>
    </NextLink>
  );
};

export default Link;
