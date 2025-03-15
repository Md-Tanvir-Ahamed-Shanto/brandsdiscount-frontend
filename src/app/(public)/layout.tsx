import { ScrollTop } from '@/lib';
import '../../styles/global.css';
import { TheFooter, TheHeader } from '../components';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="scroll-smooth">
            <TheHeader />
                {children}
            <TheFooter />
            <ScrollTop />
        </main>
    );
}
