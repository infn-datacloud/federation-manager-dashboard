import Box from "@/components/box";
import { Gravatar } from "@/components/gravatar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import LogoutButton from "./LogoutButton";
import Custom401 from "@/app/pages/401";

export default async function Settings() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    // Auth error, show 401 page
    return <Custom401 />;
  }

  const userRoles = process.env.USER_ROLES
    ? process.env.USER_ROLES.split(",")
    : [];

  return (
    <>
      <Box>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-6">
            <Gravatar email={session?.user.email} />
            <div>
              <h1>{session?.user.name}</h1>
              <div className="mt-1 flex flex-col gap-2 md:flex-row">
                {userRoles.map(role => {
                  return (
                    <span
                      key={role}
                      className="bg-infn/60 flex size-4 max-w-fit flex-none items-center rounded-full p-0.5 px-2 text-xs font-bold text-white sm:h-5 sm:min-w-max"
                    >
                      <span className="hidden sm:block">
                        {role.replace("-", " ").toUpperCase()}
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <LogoutButton />
        </div>
      </Box>
    </>
  );
}
