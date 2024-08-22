import React, { useState, useEffect } from 'react';
import { Layout, Menu, Input, Card, Row, Col, Button, Spin, message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase.config';

const { Sider, Content } = Layout;
const { Search } = Input;
const { Meta } = Card;

function SearchResult() {
    const [vehicles, setVehicles] = useState([]);
    const [brands, setBrands] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVehicles();
        fetchBrands();
    }, []);

    const fetchVehicles = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "vehiculos"));
            const vehiclesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setVehicles(vehiclesData);
            setFilteredVehicles(vehiclesData);
        } catch (error) {
            console.error("Error al obtener los vehículos:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchBrands = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "marcas"));
            const brandsData = querySnapshot.docs.map(doc => ({
                key: doc.id,
                label: getBrandLabel(doc.data().nombre),
                onClick: () => handleBrandClick(doc.data().nombre),
            }));
            setBrands(brandsData);
        } catch (error) {
            console.error("Error al obtener las marcas:", error);
        } finally {
            setLoading(false);
        }
    };

    const getBrandLabel = (brand) => (
        <span>
            {brand}
            {selectedBrand === brand && (
                <CloseOutlined
                    onClick={(e) => {
                        e.stopPropagation();
                        handleBrandClick(brand);
                    }}
                    style={{ marginLeft: 8 }}
                />
            )}
        </span>
    );

    const handleBrandClick = (brand) => {
        if (selectedBrand === brand) {
            setSelectedBrand(null);
            setFilteredVehicles(vehicles);
        } else {
            setSelectedBrand(brand);
            const filtered = vehicles.filter(vehicle => vehicle.marca === brand);
            setFilteredVehicles(filtered);
        }
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        filterVehicles(selectedBrand, term);
    };

    const filterVehicles = (brand, term) => {
        let filtered = vehicles;

        if (brand) {
            filtered = filtered.filter(vehicle => vehicle.marca === brand);
        }

        if (term) {
            filtered = filtered.filter(vehicle =>
                vehicle.marca.toLowerCase().includes(term.toLowerCase()) ||
                vehicle.modelo.toLowerCase().includes(term.toLowerCase())
            );
        }

        if (filtered.length === 0) {
            message.error('No se encontraron resultados para la búsqueda o filtro aplicado.');
        }

        setFilteredVehicles(filtered);
    };

    const handleViewDetails = (id) => {
        navigate(`/vehiculo/${id}`);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={200} className="site-layout-background" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#001529' }}>
                <h3 style={{ padding: '20px', color: 'white', margin: 0 }}>Marcas</h3>
                <Menu
                    mode="vertical"
                    style={{ flex: 1, overflowY: 'auto', backgroundColor: "#fafafa", borderRight: 0 }}
                    items={brands.map(brand => ({
                        key: brand.key,
                        label: brand.label,
                        onClick: () => handleBrandClick(brand.label.props.children[0]),
                    }))}
                />
            </Sider>
            <Layout style={{ padding: '0 24px 24px', backgroundColor: "#fafafa" }}>
                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: '100vh',
                        backgroundColor: '#fafafa',
                    }}
                >
                    <Spin spinning={loading}>
                        <Search
                            placeholder="Buscar por marca o modelo"
                            enterButton="Buscar"
                            size="large"
                            style={{ marginBottom: 20 }}
                            onSearch={handleSearch}
                        />
                        <Row gutter={[16, 16]}>
                            {filteredVehicles.map((vehicle) => (
                                <Col span={8} key={vehicle.id}>
                                    <Card
                                        title={`${vehicle.marca} ${vehicle.modelo}`}
                                        bordered={false}
                                        cover={vehicle.imageUrl && (
                                            <img
                                                alt={`${vehicle?.marca} ${vehicle?.modelo}`}
                                                src={vehicle?.imageUrl}
                                                style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: 'inherit' }}
                                            />
                                        )}
                                    >
                                        <Meta description={vehicle?.descripcion} />
                                        <p>Tipo: {vehicle?.tipo}</p>
                                        <p>Kilometros: {vehicle?.kilometros}</p>
                                        <p>Motor: {vehicle?.motor}</p>
                                        <p>Precio: {vehicle?.precio}</p>
                                        <Button onClick={() => handleViewDetails(vehicle.id)}>
                                            Ver más
                                        </Button>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Spin>
                </Content>
            </Layout>
        </Layout>
    );
}

export default SearchResult;
