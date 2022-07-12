import React from 'react'
import {Navigate} from "react-router-dom";
import {useSelector} from '../../redux/hooks';

export const PrivateRoute = ({element, ...rest}) => {
  const jwt = useSelector(state => state.user.token)

  const RouteComponent = (props) => {
    return jwt ? React.createElement(() => element, props) : <Navigate replace to="/login"/>
  }
  return <RouteComponent {...rest}/>
}
