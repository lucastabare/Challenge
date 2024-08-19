import { Request, Response } from 'express';
import { Vehiculo } from "../models/Vehiculo.model";
import Marca from '../models/Marca.model';

class VehiculosController {
    getVehiculos = async (req: Request, res: Response): Promise<void> => {
        try {
            const vehiculos = await Vehiculo.findAll({
                include: [{
                    model: Marca,
                    as: 'marca',
                }],
            });
            res.json(vehiculos);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    };
}

export const vehiculosController = new VehiculosController();

