import React, { useMemo, useState } from 'react'
import Box from '3box'
import ThreeBoxCommentsReact from '3box-comments-react'
import styled from 'styled-components'
import { ConnectedWeb3Context, useConnectedWeb3Context } from '../../../hooks/connectedWeb3'
import { THREEBOX_ADMIN_ADDRESS, THREEBOX_SPACE_NAME } from '../../../common/constants'
import { getLogger } from '../../../util/logger'

const logger = getLogger('Component::ThreeBoxComments')

const ThreeBoxCustom = styled.div`
  border-top: 1px solid ${props => props.theme.borders.borderColor};
  margin: 40px 0 0 0;
  padding: 20px 0 0;

  > .threebox-comments-react {
    max-width: 100%;
    padding: 0;

    /* Main comment area */
    .input {
      img {
        height: 40px;
        max-height: 40px;
        max-width: 40px;
        min-height: 40px;
        min-width: 40px;
        width: 40px;
      }

      .input_form {
        color: #000;
        font-size: 13px;
        font-weight: normal;
        height: 54px;
        line-height: 1.2;
        min-height: 54px;
        padding: 5px 12px 5px 60px;
      }

      .input_commentAs {
        color: #999;
        left: auto;
        right: 0;
      }
    }

    /* Comments list */
    .dialogue {
      /* Comment */
      .comment {
        img {
          height: 30px;
          max-height: 30px;
          max-width: 30px;
          min-height: 30px;
          min-width: 30px;
          width: 30px;
        }
        .comment_content_context_main_user_info {
          margin-bottom: 0;
        }
        .comment_content_context_main_user_info_username {
          color: #000;
          font-size: 15px;
          font-weight: 500;
          line-height: 1.2;
        }
        .comment_content_context {
          margin: 0;
        }
        .comment_content_context_time {
          color: #999;
          font-size: 11px;
          line-height: 1.2;
          margin-bottom: 5px;
        }
        .comment_content_text {
          color: #333;
          font-size: 13px;
          font-weight: normal;
          line-height: 1.45;
          margin: 0;
          text-align: left;
        }
      }
    }

    .context {
      height: auto;
      justify-content: flex-end;
      margin: 0;

      .context_text {
        color: #999;
        font-size: 12px;
        font-weight: 400;
        line-height: 1.2;
      }
    }
  }
`

const CommentsTitle = styled.h3`
  color: #000;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.2;
  margin: 0 0 15px;
`

export const ThreeBoxComments = () => {
  const context: ConnectedWeb3Context = useConnectedWeb3Context()

  const [box, setBox] = useState<any>(null)
  const [currentUserAddress, setCurrentUserAddress] = useState<string>(context.account)

  const handle3boxLogin = async () => {
    const { account, library } = context
    logger.log(`Open three box with account ${account}`)

    const box = await Box.openBox(currentUserAddress, library._web3Provider)
    await box.openSpace(THREEBOX_SPACE_NAME)

    setBox(box)
    setCurrentUserAddress(account)

    box.onSyncDone(() => {
      logger.log(`Three box sync with account ${account}`)
      setBox(box)
    })
  }

  useMemo(() => handle3boxLogin(), [context])

  return (
    <ThreeBoxCustom>
      <CommentsTitle>Comments</CommentsTitle>
      <ThreeBoxCommentsReact
        adminEthAddr={THREEBOX_ADMIN_ADDRESS}
        box={box}
        currentUserAddr={currentUserAddress}
        showCommentCount={10}
        spaceName={THREEBOX_SPACE_NAME}
        threadName="profile"
        useHovers={false}
      />
    </ThreeBoxCustom>
  )
}
