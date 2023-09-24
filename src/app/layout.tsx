import SessionProvider from '@/components/SessionProvider';
import { authOption } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import '../styles/globals.css';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FlickFlair',
  description:
    'FlickFlair - where you explore the diversity and excitement of the film industry.',
  icons:
    'https://imgs.search.brave.com/xaW0Db2L0DdIhCGKexlVwBSYLS1uX2m-OQm9ifg4yEM/rs:fit:980:856:1/g:ce/aHR0cDovL2Nkbi5v/bmxpbmV3ZWJmb250/cy5jb20vc3ZnL2lt/Z181MDMzNTgucG5n'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOption);

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
