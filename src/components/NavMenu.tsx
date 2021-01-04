import React from 'react';
import { Menu } from 'semantic-ui-react';

const NavMenu: React.FC<{}> = () => {
  return (
    <Menu size="massive" tabular>
      <Menu.Item
        name='Kryha'
      />
    </Menu>
  )
};

export default NavMenu;