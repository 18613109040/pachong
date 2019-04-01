import React, { Suspense } from 'react';
import { Layout } from 'antd';
import Footer from './Footer';
import Header from './Header';
import SliderMenu from '../components/SliderMenu'
import { connect } from 'dva';
const { Content } = Layout;
import styles from './BasicLayout.module.less';
@connect(({ global }) => ({
  collapsed: global.collapsed
}))
export default class BasicLayout extends React.Component {
  componentDidMount() {
  }
  handleMenuCollapse = () => {
    const { dispatch, collapsed } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: !collapsed,
    })
  }
  render(){
    const { children } = this.props;
    return (
      <Layout>
        <SliderMenu
          // logo={logo}
          // theme={navTheme}
          collapsed={collapsed}
          // menuData={menu}
          onCollapse={this.handleMenuCollapse}
          {...this.props}
        />
        <Layout
          style={{
            minHeight: '100vh',
          }}
        >
          <Header 
            // currentUser={}
            handleMenuCollapse={this.handleMenuCollapse} 
            collapsed={collapsed}
            {...this.props}
          />
          <Content className={styles.content}>
            {children}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    )
  }
}
