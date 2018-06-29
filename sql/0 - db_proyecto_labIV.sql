CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NULL,
  `rol` varchar(255) COLLATE utf8_unicode_ci NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `cliente` (
  `id` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `viajes` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `lat_o` float COLLATE utf8_unicode_ci NULL,
  `lng_o` float COLLATE utf8_unicode_ci NULL,
  `lat_d` float COLLATE utf8_unicode_ci NULL,
  `lng_d` float COLLATE utf8_unicode_ci NULL,
  `fechayhora` varchar(255) COLLATE utf8_unicode_ci NULL,
  `tipo_pago` varchar(255) COLLATE utf8_unicode_ci NULL,
  `nivel` int(11) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

  ALTER TABLE `viajes`
    ADD PRIMARY KEY (`id`);

  ALTER TABLE `viajes`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--Estado es 0 1 2 pedido realziado cancelado
ALTER TABLE `viajes`
  ADD CONSTRAINT `fk_viajes_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`);

INSERT INTO `usuario` (`username`, `password`,`email`, `rol`) VALUES
('admin', '12345678a','admin@gmail.com','admin'),
('Remisero I', '12345678a','remisero1@gmail.com','remisero'),
('Encargado I', '12345678a','encargado1@gmail.com','encargado');

INSERT INTO `cliente` (`username`, `password`,`email`) VALUES
('Noelia Nieres', '12345678a','noe.nieres@gmail.com'),
('Santiago de la Fuente', '12345678a','santiagodelafuente83@gmail.com');

CREATE TABLE `vehiculos` (
  `id` int(11) NOT NULL,
  `marca` varchar(255) COLLATE utf8_unicode_ci NULL,
  `patente` varchar(255) COLLATE utf8_unicode_ci NULL,
  `ocupantes` varchar(255) COLLATE utf8_unicode_ci NULL,
  `categoria` varchar(255) COLLATE utf8_unicode_ci NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `vehiculos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


CREATE TABLE `mascotas` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `nro_ficha` varchar(255) COLLATE utf8_unicode_ci NULL,
  `raza` varchar(255) COLLATE utf8_unicode_ci NULL,
  `color` varchar(255) COLLATE utf8_unicode_ci NULL,
  `edad` varchar(255) COLLATE utf8_unicode_ci NULL,
  `tipo` int(11) COLLATE utf8_unicode_ci NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE `mascotas`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `mascotas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

  CREATE TABLE `turnos` (
    `id` int(11) NOT NULL,
    `mascota_id` varchar(255) COLLATE utf8_unicode_ci NULL,
    `fecha` varchar(255) COLLATE utf8_unicode_ci NULL,
    `autorizado` varchar(255) COLLATE utf8_unicode_ci NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

  ALTER TABLE `turnos`
    ADD PRIMARY KEY (`id`);

  ALTER TABLE `turnos`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


    CREATE TABLE `encuestas` (
      `id` int(11) NOT NULL,
      `usuario_id` varchar(255) COLLATE utf8_unicode_ci NULL,
      `respuesta_1` varchar(255) COLLATE utf8_unicode_ci NULL,
      `respuesta_2` varchar(255) COLLATE utf8_unicode_ci NULL,
      `respuesta_3` varchar(255) COLLATE utf8_unicode_ci NULL,
      `respuesta_4` varchar(255) COLLATE utf8_unicode_ci NULL,
      `respuesta_5` varchar(255) COLLATE utf8_unicode_ci NULL,
      `respuesta_6` varchar(255) COLLATE utf8_unicode_ci NULL,
      `respuesta_7` varchar(255) COLLATE utf8_unicode_ci NULL,
      `respuesta_8` varchar(255) COLLATE utf8_unicode_ci NULL,
      `foto_1` varchar(255) COLLATE utf8_unicode_ci NULL,
      `foto_2` varchar(255) COLLATE utf8_unicode_ci NULL,
      `foto_3` varchar(255) COLLATE utf8_unicode_ci NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

    ALTER TABLE `encuestas`
      ADD PRIMARY KEY (`id`);

    ALTER TABLE `encuestas`
      MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;