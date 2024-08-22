import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Card, Row, Col } from 'antd';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase.config';

const { Sider, Content } = Layout;
const { Search } = Input;

function SearchResult() {
    const [vehicles, setVehicles] = useState([]);
    const [brands, setBrands] = useState([]); 

    useEffect(() => {
        fetchVehicles();
        fetchBrands();  
    }, []);

    const fetchVehicles = async () => {
        const querySnapshot = await getDocs(collection(db, "vehiculos"));
        const vehiclesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setVehicles(vehiclesData);
    };

    const fetchBrands = async () => {
        const querySnapshot = await getDocs(collection(db, "marcas"));
        const brandsData = querySnapshot.docs.map(doc => ({
            key: doc.id,
            label: doc.data().nombre
        }));
        setBrands(brandsData);
    };

    return (
        <Layout>
            <Sider width={200} className="site-layout-background">
                <Menu
                    mode="vertical"
                    style={{ height: '100%', borderRight: 0 }}
                    items={brands}  
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
                        {vehicles.map((vehicle) => (
                            <Col span={8} key={vehicle.id}>
                                <Card
                                    title={`${vehicle.marca} ${vehicle.modelo}`}
                                    bordered={false}
                                    cover={vehicle.imageUrl && <img alt={`${vehicle.marca} ${vehicle.modelo}`} src={vehicle.imageUrl} />}
                                >
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
