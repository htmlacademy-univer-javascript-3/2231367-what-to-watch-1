import React, {Fragment} from 'react';
import {Link} from "react-router-dom";

function NotFoundPage(): JSX.Element {
  return (
    <Fragment>
      <h1>404 Not Found</h1>
      <Link to='/'>На главную страницу</Link>
    </Fragment>
  );
}
export default NotFoundPage;
