import React, { FC, Dispatch, SetStateAction } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';

interface IActivityButtons {
  fetchDocuments: (event?: React.MouseEvent) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setLoadingMessage: Dispatch<SetStateAction<string>>;
}

const ActivityButtons: FC<IActivityButtons> = ({ fetchDocuments, setIsLoading, setLoadingMessage }) => {
  const sendPostRequest = async (uri: string, loadingMessage: string) => {
    try {
      setLoadingMessage(loadingMessage)
      setIsLoading(true);
      await axios.post(`http://localhost:8080/${uri}-user-documents`, {}, { headers: {} });
      setLoadingMessage('')
      setIsLoading(false)
      fetchDocuments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ float: 'left' }}>
      <Button size='large' primary onClick={() => { sendPostRequest('add', 'filling database...') }}>Fill Database</Button>
      <Button size='large' secondary onClick={() => sendPostRequest('delete', 'deleting user documents...')}>Delete</Button>
    </div>
  )
}
export default ActivityButtons