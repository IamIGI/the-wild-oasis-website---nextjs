// import { useSession } from 'next-auth/react';
// import {
//   useSearchParams,
//   useRouter,
// } from 'next/navigation';
// import { useEffect } from 'react';
import SignInButton from '../_components/SignInButton';

export const metadata = {
  title: 'Login',
};

export default function Page() {
  //   const searchParams = useSearchParams();
  //   const router = useRouter();
  //   const { data: session, status } = useSession();
  //   const callbackUrl =
  //     searchParams.get('callbackUrl') || '/';

  //   useEffect(() => {
  //     console.log({ session, status });
  //     if (status === 'authenticated' && session) {
  //       router.push(callbackUrl);
  //     }
  //   }, [status, session, router, callbackUrl]);

  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>
      <SignInButton />
    </div>
  );
}
