import { Suspense } from 'react';
import type { Metadata } from 'next';
import '@/styles/global.css';

export const metadata: Metadata = {
    title: 'Multibuscador | Escritura y Lectura',
    description: 'Sitio web oficial del servidor Escritura y Lectura.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body>
                <Suspense>
                    {children}
                </Suspense>
            </body>
        </html>
    );
}
