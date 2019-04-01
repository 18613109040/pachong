import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '../components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'iGola',
          key: 'iGola',
          title: 'iGola',
          href: 'https://www.igola.com',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2019 iGola前端技术团队出品
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;