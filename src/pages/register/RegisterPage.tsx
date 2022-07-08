import React from 'react'
import {UserLayout} from "../../layout";
import {RegisterForm} from "./RegisterForm";

export const RegisterPage: React.FC = () => {
  return (
    <>
      <UserLayout>
        <RegisterForm/>
      </UserLayout>
    </>
  )
}
