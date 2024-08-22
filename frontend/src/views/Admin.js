import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Button, Card, Row, Col, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from '../config/firebase.config';

const { Sider, Content } = Layout;

function Admin() {
    const [vehicles, setVehicles] = useState([]);
    const [form] = Form.useForm();
    const [editingVehicle, setEditingVehicle] = useState(null);
    const [imageFile, setImageFile] = useState(null); 

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        const querySnapshot = await getDocs(collection(db, "vehiculos"));
        const vehiclesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setVehicles(vehiclesData);
    };

    const onFinish = async (values) => {
        try {
            let imageUrl = null;
            if (imageFile) {
                imageUrl = await uploadImage(imageFile); 
            }

            const vehicleData = { ...values, imageUrl }; 

            if (editingVehicle) {
                const vehicleDoc = doc(db, "vehiculos", editingVehicle.id);
                await updateDoc(vehicleDoc, vehicleData);
                message.success('Vehículo actualizado exitosamente');
            } else {
                await addDoc(collection(db, "vehiculos"), vehicleData);
                message.success('Vehículo agregado exitosamente');
            }

            form.resetFields();
            setImageFile(null);
            setEditingVehicle(null);
            fetchVehicles();
        } catch (error) {
            message.error('Error al guardar el vehículo');
        }
    };

    const uploadImage = async (file) => {
        const storage = getStorage();
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
    };

    const handleEdit = (vehicle) => {
        setEditingVehicle(vehicle);
        form.setFieldsValue(vehicle);
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "vehiculos", id));
            message.success('Vehículo eliminado exitosamente');
            fetchVehicles();
        } catch (error) {
            message.error('Error al eliminar el vehículo');
        }
    };

    const handleImageChange = ({ file }) => {
        setImageFile(file.originFileObj);
    };

    return (
        <Layout>
            <Sider width={200} className="site-layout-background">
                <h2 style={{ color: 'white' }}>Panel de Administración</h2>
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
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        style={{ marginBottom: 20 }}
                    >
                        <Form.Item
                            name="marca"
                            label="Marca"
                            rules={[{ required: true, message: 'Por favor ingrese la marca del vehículo' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="modelo"
                            label="Modelo"
                            rules={[{ required: true, message: 'Por favor ingrese el modelo del vehículo' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="precio"
                            label="Precio"
                            rules={[{ required: true, message: 'Por favor ingrese el precio del vehículo' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="tipo"
                            label="Tipo"
                            rules={[{ required: true, message: 'Por favor ingrese el tipo de vehículo' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="imagen"
                            label="Imagen"
                            valuePropName="fileList"
                            getValueFromEvent={handleImageChange}
                        >
                            <Upload beforeUpload={() => false} onChange={handleImageChange}>
                                <Button icon={<UploadOutlined />}>Seleccionar Imagen</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {editingVehicle ? 'Actualizar Vehículo' : 'Agregar Vehículo'}
                            </Button>
                        </Form.Item>
                    </Form>

                    <Row gutter={[16, 16]}>
                        {vehicles.map((vehicle) => (
                            <Col span={8} key={vehicle.id}>
                                <Card
                                    title={`${vehicle.marca} ${vehicle.modelo}`}
                                    bordered={false}
                                    extra={
                                        <div>
                                            <Button onClick={() => handleEdit(vehicle)} style={{ marginRight: 10 }}>
                                                Editar
                                            </Button>
                                            <Button danger onClick={() => handleDelete(vehicle.id)}>
                                                Eliminar
                                            </Button>
                                        </div>
                                    }
                                >
                                    <p>Tipo: {vehicle.tipo}</p>
                                    <p>Precio: {vehicle.precio}</p>
                                    {vehicle.imageUrl && <img src={vehicle.imageUrl} alt={`${vehicle.marca} ${vehicle.modelo}`} style={{ width: '100%' }} />}
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Admin;
