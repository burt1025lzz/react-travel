import React from 'react'
import {UserLayout} from "../../layout";
import {LoginForm} from "./LoginForm";

export const LoginPage: React.FC = () => {
  return (
    <>
      <UserLayout>
        <LoginForm/>
      </UserLayout>
    </>
  )
}
