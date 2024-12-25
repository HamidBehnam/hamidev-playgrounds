'use client';

import {useUser} from "@auth0/nextjs-auth0/client";
import LoginButton from "@/app/_components/LoginButton/LoginButton";
import LogoutButton from "@/app/_components/LogoutButton/LogoutButton";

const Navigation = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (!user) return <LoginButton />;

  return user && (
    <div>
      <LogoutButton />
      <div>
        <img src={user.picture!} alt={user.name!} />
        <p>{user.name}</p>
      </div>
    </div>
  );
}

export default Navigation;
