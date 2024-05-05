import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import ErrorBoundary from './error';
import './globals.css';

const roboto = Roboto({
    weight: ['100', '300', '400', '500', '700', '900'],
    subsets: ['latin']
});

export const metadata: Metadata = {
    title: 'SME Health - Get Started',
    description: 'SME HealthCheck'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${roboto.className} bg-background`}>
                <main>
                    <ErrorBoundary>
                        <AntdRegistry>{children}</AntdRegistry>
                    </ErrorBoundary>
                </main>
            </body>
        </html>
    );
}
