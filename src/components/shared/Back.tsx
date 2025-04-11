import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface IProps {
    labelFor: string;
    url: string;
    className?: string;
}
const BackBtn = ({ labelFor, url, className }: IProps) => {
    return (
        <Link
            href={url}
            className={`flex items-center gap-2 text-sm hover:underline ${className}`}
        >
            <ArrowLeft size={16} />
            Back to {labelFor}
        </Link>
    );
};

export default BackBtn;
