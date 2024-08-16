CREATE TABLE marcas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    pais_origen VARCHAR(255),
    ano_fundacion INT
);

CREATE TABLE vehiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marca_id INT,
    descripcion TEXT,
    kilometros INT,
    modelo VARCHAR(255),
    puertas INT,
    precio DECIMAL(10, 2),
    color VARCHAR(100),
    cc_motor INT,
    FOREIGN KEY (marca_id) REFERENCES marcas(id)
);

CREATE TABLE ordenes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehiculo_id INT,
    usuario_id INT,
    fecha_orden DATE,
    total DECIMAL(10, 2),
    FOREIGN KEY (vehiculo_id) REFERENCES vehiculos(id)
);