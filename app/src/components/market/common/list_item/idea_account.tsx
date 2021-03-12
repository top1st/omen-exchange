import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

import { getLogger } from '../../../../util/logger'

interface Props extends HTMLAttributes<HTMLDivElement> {
  name: string
  order?: boolean
  category: string
  price: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LogoImg = styled.img`
  height: 40px;
  border-radius: 50%;
`

const logger = getLogger('Market::IdeaAccount')

export const IdeaAccount: React.FC<Props> = (props: Props) => {
  const { category, name, order, price } = props

  const nameItem = <div key="name">{name}</div>
  const logoItem = (
    <div key="logoImg">
      <LogoImg
        alt={name}
        key="logoimg"
        src={`https://unavatar.backend.ideamarket.io:8080/${category}/${name.replace('@', '')}`}
      />
    </div>
  )

  const contents = order ? [logoItem, nameItem] : [nameItem, logoItem]
  return (
    <Wrapper>
      {contents}
      <div>{price}</div>
    </Wrapper>
  )
}
