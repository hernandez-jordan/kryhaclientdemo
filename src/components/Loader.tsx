import React from 'react'
import { Message, Icon } from 'semantic-ui-react'

interface IMessage {
  loadingMessage: string;
}
const Loader: React.FC<IMessage> = ({ loadingMessage }) => (
  <Message style={{ width: '100%' }} icon size='large'>
    <Icon name='circle notched' loading />
    <Message.Content>
      <Message.Header>Just one second</Message.Header>
      {loadingMessage}
    </Message.Content>
  </Message>
)

export default Loader