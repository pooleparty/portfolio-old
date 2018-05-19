import * as React from 'react';
import { Helmet } from 'react-helmet';

const Meta: React.SFC<{}> = () => (
  <Helmet>
    <title>Josh Poole's Portfolio</title>
    <meta
      name="og_title"
      property="og:title"
      content="Josh Poole's Portfolio"
    />
    <meta
      name="og_site_name"
      property="og:site_name"
      content="Josh Poole's Portfolio"
    />
    <meta name="apple-mobile-web-app-title" content="Josh Poole's Portfolio" />
    <meta name="apple-mobile-web-app-capable" content="no" />
  </Helmet>
);

export default Meta;
