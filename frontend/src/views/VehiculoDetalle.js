import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase.config';
import { Card, Button } from 'antd';

function VehiculoDetalle() {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        fetchVehicle();
    }, [id]);

    const fetchVehicle = async () => {
        const vehicleDoc = await getDoc(doc(db, "vehiculos", id));
        if (vehicleDoc.exists()) {
            setVehicle(vehicleDoc.data());
        }
    };

    return (
        <div style={{ padding: 24 }}>
            {vehicle && (
                <Card
                    title={`${vehicle.marca} ${vehicle.modelo}`}
                    cover={vehicle.imageUrl && <img alt={`${vehicle.marca} ${vehicle.modelo}`} src={vehicle.imageUrl} />}
                >
                    <p>Tipo: {vehicle.tipo}</p>
                    <p>Precio: {vehicle.precio}</p>
                    <p>Kilómetros: {vehicle.kilometros}</p>
                    <p>Color: {vehicle.color}</p>
                    <p>Motor: {vehicle.cc_motor} cc</p>
                    <Button type="primary" onClick={() => window.history.back()}>Volver</Button>
                </Card>
            )}
        </div>
    );
}

export default VehiculoDetalle;
