import React from 'react'
import {useParams, useSearchParams} from "react-router-dom"


export const DetailPage: React.FC = () => {
  const {id} = useParams()
  const [searchParams] = useSearchParams()
  const searchParamsId = searchParams.get('id')
  return (
    <>
      <h1>旅游路线详情页: Segments ID: {id}</h1>
      <h1>旅游路线详情页: Search ID: {searchParamsId}</h1>
    </>
  )
}
