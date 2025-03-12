import Link from 'next/link';
import React, { FC, ReactNode, AnchorHTMLAttributes } from 'react';

interface IProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    children: ReactNode;
    className?: string;
    href: string;
    target?: string;
}

const LinkButton: FC<IProps> = ({
    children,
    className,
    href,
    target,
    ...props
}) => {
    return (
        <Link
            {...props}
            href={href}
            target={target}
            className={`text-gray-800 px-4 py-2.5 font-medium 
                hover:scale-101 transition-all duration-300 ${className}`}
        >
            {children}
        </Link>
    );
};

export default LinkButton;
