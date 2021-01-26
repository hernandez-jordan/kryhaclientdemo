import React, { FC } from 'react'
import { Pagination } from 'semantic-ui-react'

interface IPagination {
  defaultActivePage: string | number | undefined;
  onPageChangeHandler: (event?: React.MouseEvent) => void;
  totalPages: number;
}

const PaginationComponent: FC<IPagination> = ({ defaultActivePage, onPageChangeHandler, totalPages }) => {
  return (
    <Pagination
      boundaryRange={2}
      defaultActivePage={defaultActivePage}
      ellipsisItem={null}
      firstItem={null}
      lastItem={null}
      siblingRange={1}
      totalPages={totalPages}
      onPageChange={onPageChangeHandler}
    />

  )
}

export default PaginationComponent