import { GithubIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { signIn } from '@/auth';
import { Button } from '@/components/ui/button';

const SignInPage = async () => {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-between gap-10 bg-gray-50 px-10 pt-10 lg:flex-row">
      <div className="flex flex-col items-center justify-center space-y-6 lg:w-1/2">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Welcome Back!
        </h1>
        <p className="text-balance text-center text-gray-600">
          Sign in to access your personalized dashboard, manage your tasks, and
          stay on top of your projects. Let&apos;s get started!
        </p>
        <Image
          src="/sign-in-image.svg"
          width={500}
          height={500}
          alt="hero"
          className="max-w-sm"
        />
      </div>

      <div className="mx-auto flex flex-col items-center space-y-4 lg:w-96">
        <h2 className="text-xl font-semibold text-gray-700">
          Sign in to your account
        </h2>
        <form
          className="w-full"
          action={async () => {
            'use server';

            await signIn('google', { redirectTo: '/dashboard' });
          }}
        >
          <Button
            type="submit"
            variant="outline"
            className="inline-flex w-full justify-start border border-gray-300 text-center"
          >
            <Image
              src="/google_icon.svg"
              width={30}
              height={30}
              alt="google_icon"
              className="mr-2"
            />
            <span className="flex w-full justify-center text-gray-600">
              Sign in with Google
            </span>
          </Button>
        </form>
        <form
          className="w-full"
          action={async () => {
            'use server';

            await signIn('github', { redirectTo: '/dashboard' });
          }}
        >
          <Button className="inline-flex w-full justify-start bg-gray-800 text-center text-white">
            <GithubIcon className="mr-2 size-6" />
            <span className="flex w-full justify-center">
              Sign in with Github
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
