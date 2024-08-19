import { Request, Response } from 'express';
import Orden from '../models/Orden.model';
import Vehiculo from '../models/Vehiculo.model';


class OrdenController {

    createOrder = async (req: Request, res: Response) => {
        try {
            const { vehiculoId, usuarioId, fechaOrden, total } = req.body;

            const vehiculo = await Vehiculo.findByPk(vehiculoId);
            if (!vehiculo) {
                return res.status(404).json({ error: 'Vehículo no encontrado' });
            }

            const nuevaOrden = await Orden.create({
                vehiculo_id: vehiculoId,
                usuario_id: usuarioId,
                fecha_orden: fechaOrden,
                total,
            });

            res.status(201).json(nuevaOrden);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    };

}

export const ordenController = new OrdenController();