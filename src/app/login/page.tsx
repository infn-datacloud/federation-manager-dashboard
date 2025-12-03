"use client";

import { Button } from "@/components/buttons";
import Header from "@/components/header";
import { authClient } from "@/lib/auth-client";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";
import logo from "@/assets/infn_logo.png";

export default function LoginPage() {
  const handleLogin = async () => {
    await authClient.signIn.oauth2({
      providerId: "iam",
      callbackURL: "/",
      errorCallbackURL: "/",
      newUserCallbackURL: "/",
      disableRedirect: false,
      scopes: process.env.FM_OIDC_SCOPES?.split(" "),
      requestSignUp: false,
    });
  };

  return (
    <>
      <Header
        logo={logo}
        title="Federation Manager"
        subtitle="Seamlessly integrating providers and communities into DataCloud with simplicity, security, and automated resource management."
      />
      <div className="flex w-full flex-col items-center">
        <Button
          className="btn btn-primary flex w-full items-center justify-center space-x-2 px-4 py-2 text-lg font-bold md:w-1/2"
          onClick={handleLogin}
        >
          <ArrowLeftEndOnRectangleIcon className="size-6" />
          Log in with IAM
        </Button>
      </div>
    </>
  );
}
