import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ResumeProvider } from '@/context/ResumeContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Resume Maxxer | Szwajcarski Kreator CV (Typst Engine)',
  description:
    'Zbuduj nowoczesne, minimalistyczne CV w architekturze po stronie klienta (Client-Side). Kompilacja Typst dla 100% czytelności w systemach ATS, bez baz danych i śledzenia.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-surface text-content font-sans selection:bg-content selection:text-content-inverse">
        <ResumeProvider>{children}</ResumeProvider>
      </body>
    </html>
  );
}
