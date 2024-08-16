import React from 'react';
import { Layout, Menu, Input, Card, Row, Col } from 'antd';
import mockData from '../mockData/mockData';
const { Sider, Content } = Layout;
const { Search } = Input;

function SearchResult() {
    return (
        <Layout>
            <Sider width={200} className="site-layout-background">
                <Menu
                    mode="vertical"
                    style={{ height: '100%', borderRight: 0 }}
                    items={[
                        { key: '1', label: 'Toyota' },
                        { key: '2', label: 'Ford' },
                        { key: '3', label: 'Chevrolet' },
                        { key: '4', label: 'Honda' },
                        { key: '5', label: 'BMW' },
                        { key: '6', label: 'Mercedes' },
                        { key: '7', label: 'Audi' },
                        { key: '8', label: 'Nissan' },
                        { key: '9', label: 'Jeep' },
                        { key: '10', label: 'Mazda' },
                    ]}
                />
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        backgroundColor: '#fff',
                    }}
                >
                    <Search
                        placeholder="Buscar por marca o modelo"
                        enterButton="Buscar"
                        size="large"
                        style={{ marginBottom: 20 }}
                    />
                    <Row gutter={[16, 16]}>
                        {mockData.map((vehicle) => (
                            <Col span={8} key={vehicle.id}>
                                <Card title={`${vehicle.marca} ${vehicle.modelo}`} bordered={false}>
                                    <p>Tipo: {vehicle.tipo}</p>
                                    <p>Precio: {vehicle.precio}</p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
}

export default SearchResult;