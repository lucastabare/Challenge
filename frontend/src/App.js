import './App.css';
import { Layout, Menu } from 'antd';
import items from './menu/menuHeader';
import AppRouter from './Router';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '0 48px', height: '90vh' }}>
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: "#f7f3f6",
            borderRadius: "8px",
          }}
        >
          <AppRouter />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        ©{new Date().getFullYear()} Created by Lucas Tabare
      </Footer>
    </Layout>
  );
}

export default App;
