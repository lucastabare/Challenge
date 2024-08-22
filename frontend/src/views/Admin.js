import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Button, Card, Row, Col, message, Upload, Table, Spin } from 'antd';
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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "vehiculos"));
            const vehiclesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setVehicles(vehiclesData);
        } catch (error) {
            message.error('Error al obtener los vehículos');
        } finally {
            setLoading(false);
        }
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            let imageUrl = null;
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            const vehicleData = { ...values };
            if (imageUrl) {
                vehicleData.imageUrl = imageUrl;
            }

            Object.keys(vehicleData).forEach(key => {
                if (vehicleData[key] === undefined) {
                    delete vehicleData[key];
                }
            });

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
        } finally {
            setLoading(false);
        }
    };

    const uploadImage = async (file) => {
        try {
            const storage = getStorage();
            const storageRef = ref(storage, `images/${file.name}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            return downloadURL;
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            return null;
        }
    };

    const handleImageChange = (info) => {
        const file = info.fileList[0]?.originFileObj || null;
        setImageFile(file);
    };

    const handleEdit = (vehicle) => {
        setEditingVehicle(vehicle);
        form.setFieldsValue(vehicle);
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await deleteDoc(doc(db, "vehiculos", id));
            message.success('Vehículo eliminado exitosamente');
            fetchVehicles();
        } catch (error) {
            message.error('Error al eliminar el vehículo');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Marca',
            dataIndex: 'marca',
            key: 'marca',
        },
        {
            title: 'Modelo',
            dataIndex: 'modelo',
            key: 'modelo',
        },
        {
            title: 'Tipo',
            dataIndex: 'tipo',
            key: 'tipo',
        },
        {
            title: 'Precio',
            dataIndex: 'precio',
            key: 'precio',
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, vehicle) => (
                <span>
                    <Button onClick={() => handleEdit(vehicle)} style={{ marginRight: 10 }}>
                        Editar
                    </Button>
                    <Button danger onClick={() => handleDelete(vehicle.id)}>
                        Eliminar
                    </Button>
                </span>
            ),
        },
    ];

    return (
        <Layout>
            <Sider width={200} className="site-layout-background">
                <h2 style={{ color: 'white', padding: '10px' }}>Panel de Administración</h2>
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
                    <Spin spinning={loading}>
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
                                name="kilometros"
                                label="Kilometros"
                                rules={[{ required: true, message: 'Por favor ingrese los kilometros del vehículo' }]}
                            >
                                <Input />
                            </Form.Item>


                            <Form.Item
                                name="motor"
                                label="Motor"
                                rules={[{ required: true, message: 'Por favor ingrese el tipo de motor del vehículo' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="descripcion"
                                label="Descripcion"
                                rules={[{ required: true, message: 'Por favor ingrese una descripcion del vehículo' }]}
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

                        <Table dataSource={vehicles} columns={columns} rowKey="id" />
                    </Spin>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Admin;
