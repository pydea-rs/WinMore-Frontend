import { LinkProps } from "next/link";
import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

export interface ListProps {}
export interface ListItemProps {}
export interface ListLinkProps extends LinkProps {}
export interface ListExternalLinkProps
	extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {}
