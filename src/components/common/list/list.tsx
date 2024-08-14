import { BaseProps } from "@/types/global.types";
import { ListProps, ListItemProps, ListLinkProps, ListExternalLinkProps } from "./list.types";
import Link from "next/link";

const List: BaseProps<ListProps> = (props) => {
	const { children } = props;
	return <ul>{children}</ul>;
};

export const ListItem: BaseProps<ListItemProps> = (props) => {
	const { children } = props;
	return <li>{children}</li>;
};

export const ListLink: BaseProps<ListLinkProps> = (props) => {
	const { children, ...restProps } = props;
	return <Link {...restProps}>{children}</Link>;
};

export const ListExternalLink: BaseProps<ListExternalLinkProps> = (props) => {
	const { children, ...restProps } = props;
	return <a {...restProps}>{children}</a>;
};

export default List;
