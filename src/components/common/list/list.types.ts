import { ElementProps } from '@/types/elements.types'
import { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react'

export interface ListProps extends ElementProps {}
export interface ListItemProps extends ElementProps {}
export interface ListLinkProps extends LinkProps, ElementProps {}
export interface ListExternalLinkProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, ElementProps {}
