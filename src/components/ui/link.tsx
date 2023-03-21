import NextLink, { LinkProps as NextLinkProps } from 'next/link';

interface LinkProps extends NextLinkProps {
  className?: string;
}

export default function Link({
  href,
  children,
  className,
  ...props
}: React.PropsWithChildren<LinkProps>) {
  return (
    <NextLink href={href}>
      <a className={className} {...props}>
        {children}
      </a>
    </NextLink>
  );
}
