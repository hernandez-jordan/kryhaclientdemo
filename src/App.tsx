import React, { FC } from 'react';
import NavMenu from './components/NavMenu';
import DocumentsTable from './components/DocumentsTable'
import { Container } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'

const App: FC<{}> = () => {
  return (
    <Container>
      <NavMenu />
      <DocumentsTable />
    </Container>
  );
}

export default App;
