import React from "react";
import styled from "styled-components";
import { palette, media } from "../../lib/styles";
import { Toggler } from "../common/Toggler";

const SettingsAgreementsBlock = styled.div`
  border-bottom: 1px solid ${palette.border};
  padding: 0 3rem 3rem;
  h3 {
    margin: 2.5rem 0 2rem;
    color: ${palette.grey5};
  }
`;

const SettingsTogglersBlock = styled.div`
  display: flex;
  flex-direction: column;

  .settings-agreements-toggler-area {
    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }
    display: flex;
    h4 {
      flex: 1 0;
    }
    div {
      flex: 2 0;
      ${media.xxsmall} {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
`;

interface SettingsAgreementsProps {}

const SettingsAgreements: React.FC<SettingsAgreementsProps> = props => {
  return (
    <SettingsAgreementsBlock>
      <h3>Email notification settings</h3>
      <SettingsTogglersBlock>
        <div className='settings-agreements-toggler-area'>
          <h4>Updates</h4>
          <div>
            <Toggler size='small' />
          </div>
        </div>
        <div className='settings-agreements-toggler-area'>
          <h4>Subscriptions</h4>
          <div>
            <Toggler size='small' />
          </div>
        </div>
        <div className='settings-agreements-toggler-area'>
          <h4>Likes</h4>
          <div>
            <Toggler size='small' />
          </div>
        </div>
      </SettingsTogglersBlock>
    </SettingsAgreementsBlock>
  );
};

export { SettingsAgreements };
