import React, { useState, useEffect } from 'react'
import { Menu, Table, Label } from 'semantic-ui-react'
import PaginationComponent from './Pagination'
import ActivityButtons from './ActivityButtons'
import axios from "axios";
import Loader from './Loader'

const DocumentsTable: React.FC = () => {
  const [userDocuments, setUserDocuments] = useState<[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [tableDefaultActivePage, setTableDefaultActivePage] = useState<string | number | undefined>(undefined);

  const fetchDocuments = async (event?: React.MouseEvent) => {
    const eventPageValue = event?.currentTarget.getAttribute('value');
    const postData = {
      page: eventPageValue || 1,
    };
    const uri = 'http://localhost:8080/';
    try {
      setLoadingMessage('Fetching database...')
      setIsLoading(true);
      const res = await axios.post(uri, postData, { headers: {} });
      const docInfo = res.data;
      const allDocuments = res.data.userDocs.data;
      const totalRec = res.data.userDocs.total;
      setLoadingMessage('');
      setIsLoading(false);
      setTotalRecords(totalRec)
      setTotalPages(res.data.userDocs.totalPages);
      setTableDefaultActivePage(docInfo.userDocs.page);
      setUserDocuments(allDocuments)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDocuments()
  }, [])

  const DisplayDocumentsComponent = () => {
    if (isLoading) {
      return (
        <Table.Row><Table.Cell><Loader loadingMessage={loadingMessage} /></Table.Cell></Table.Row>
      )
    }
    if (userDocuments.length > 0) {
      return (
        <>
          {userDocuments.map(({ firstname, lastname, alias, _id }) => (
            <Table.Row key={_id}>
              <Table.Cell>{_id}</Table.Cell>
              <Table.Cell>{firstname}</Table.Cell>
              <Table.Cell>{lastname}</Table.Cell>
              <Table.Cell>{alias}</Table.Cell>
            </Table.Row>
          )
          )}
        </>
      )

    } else {
      return (
        <Table.Row >
          <Table.Cell>No data</Table.Cell>
        </Table.Row>
      )
    }
  }

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>{isLoading ? 'Loading data' : 'Unique ID'}</Table.HeaderCell>
          {isLoading ? null : (
            <>
              <Table.HeaderCell>Firstname</Table.HeaderCell>
              <Table.HeaderCell>Lastname</Table.HeaderCell>
              <Table.HeaderCell>Alias</Table.HeaderCell>
            </>
          )}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <DisplayDocumentsComponent />
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan='4'>
            <ActivityButtons
              fetchDocuments={fetchDocuments}
              setIsLoading={setIsLoading}
              setLoadingMessage={setLoadingMessage} />
            <Label color='red' size='medium' style={{ marginTop: '0.7%', marginLeft: '15%' }}>
              {`total records: ${totalRecords}`}
            </Label>
            <Menu floated='right'>
              <PaginationComponent
                defaultActivePage={tableDefaultActivePage}
                onPageChangeHandler={fetchDocuments}
                totalPages={totalPages} />
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

export default DocumentsTable
