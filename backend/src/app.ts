import express from 'express';
import { vehiculosController, ordenController } from './controllers';

const app = express();

app.use(express.json());

app.get('/vehiculos', vehiculosController.getVehiculos);
app.post('/ordenes', ordenController.createOrder);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
