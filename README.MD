# Trabajo Práctico DAW2
Autor: Ing. Gonzalo Nahuel Vaca

## Requerimientos
Se necesita tener instalados los servicios de **Docker** y **nodejs**

## Instrucciones de uso
Clonar el repositorio

### Levantar la base de datos
1. Navegar hasta la carpeta database
2. Ejecutar *./mysql.sh*, luego ejecutar *./phpmyadmin.sh
3. Abrir phpmyadmin en el browser (localhost:80)
4. user: root / password: userpass
5. importar el archivo *mysql-server.sql*

### Levantar la api
1. Navegar hasta la carpeta server
2. Ejecutar el comando *npm install*
3. Ejecutar el comando *npm run dev*

### Levantar el frontend
1. Navegar hasta la carpeta frontend
2. Ejecutar el comando *npm install*
3. Ejecutar el comando *ionic serve -o*

Si *./mysql.sh* falla en abrir es que faltan los permisos necesarios.

Ejecutar *sudo chmod +x mysql.sh* para permitir su ejecución.
## Base de datos

### Tabla Dispositivos
|Nombre          |Tipo        |Nulo|Predeterminado|Extra         |
|----------------|------------|----|--------------|--------------|
|dispositivoId   |int(11)     |no  |Ninguna       |AUTO_INCREMENT|
|nombre          |varchar(200)|si  |NULL          |              |
|ubicacion       |varchar(200)|si  |NULL          |              |
|electrovalvulaId|int(11)     |no  |Ninguna       |              |

**nombre** es la primary key y **electrovalvulaId** es una foreing key.

### Tabla Electrovalvulas
|Nombre          |Tipo        |Nulo|Predeterminado|Extra         |
|----------------|------------|----|--------------|--------------|
|electrovalvulaId|int(11)     |no  |Ninguna       |AUTO_INCREMENT|
|nombre          |varchar(45) |si  |NULL          |              |

**electrovalvulaId** es la primary key

### Tabla Log_Riegos
|Nombre          |Tipo        |Nulo|Predeterminado|Extra         |
|----------------|------------|----|--------------|--------------|
|logRiegoId      |int(11)     |no  |Ninguna       |AUTO_INCREMENT|
|apertura        |tinyint(4)  |si  |NULL          |              |
|fecha           |datetime    |si  |NULL          |              |
|electrovalvulaId|int(11)     |no  |Ninguna       |              |

**logRiegoId** es la primary key y **electrovalvulaId** es una foreing key.

### Tabla Mediciones
|Nombre          |Tipo        |Nulo|Predeterminado|Extra         |
|----------------|------------|----|--------------|--------------|
|medicionId      |int(11)     |no  |Ninguna       |AUTO_INCREMENT|
|fecha           |datetime    |si  |NULL          |              |
|valor           |varchar(100)|si  |NULL          |              |
|dispositivoId   |int(11)     |no  |Ninguna       |              |

**medicionId** es la primary key y **dispositivoId** es una foreing key.

### Vista EstadoElectrovalvulas
Esta vista se generó con la siguiente consulta
```sql
SELECT Log_Riegos.electrovalvulaId AS elecId, Log_Riegos.apertura AS elecAper 
	FROM Log_Riegos
    WHERE Log_Riegos.logRiegoId IN (
    	SELECT MAX(Log_Riegos.logRiegoId)
        FROM Log_Riegos
        GROUP BY Log_Riegos.electrovalvulaId
    ) ORDER BY Log_Riegos.electrovalvulaId;
```
Esta vista entrega el estado actual de apertura de todas las electroválvulas, según la siguiente estructura:
|Nombre          |Tipo        |
|----------------|------------|
|elecId          |int(11)     |
|elecAper        |tinyint(4)  |

### Vista UltimaMedicionDispositivo
Esta vista se generó con la siguiente consulta
```sql
SELECT 
    Mediciones.dispositivoId AS dispId, 
    Mediciones.medicionId AS medID,
    Mediciones.fecha AS medFecha,
    Mediciones.valor AS medVal  
    FROM Mediciones WHERE Mediciones.medicionId IN (
        SELECT MAX(Mediciones.medicionId) 
        FROM Mediciones 
        GROUP BY Mediciones.dispositivoId ) 
    ORDER BY Mediciones.dispositivoId;
```
Esta vista entrega la última medición de cada dispositivo, según la siguiente estructura:
|Nombre          |Tipo        |
|----------------|------------|
|dispId          |int(11)     |
|medId           |int(11)     |
|medFecha        |datetime    |
|medVal          |varchar(100)|

### Vista Listado
Esta vista se generó con la siguiente consulta
```sql
SELECT 
	Dispositivos.dispositivoId AS dispId, 
    Dispositivos.nombre AS dispNom, 
    Dispositivos.ubicacion AS dispUbi, 
    UltimaMedicionDispositivo.medID AS medId,
    UltimaMedicionDispositivo.medFecha AS medFecha,
    UltimaMedicionDispositivo.medVal AS medVal, 
    EstadoElectrovalvulas.elecId AS elecId,
    Electrovalvulas.nombre AS elecNom,
    EstadoElectrovalvulas.elecAper AS elecApe
    FROM Dispositivos
    INNER JOIN UltimaMedicionDispositivo 
    	ON Dispositivos.dispositivoId=UltimaMedicionDispositivo.dispId
    INNER JOIN EstadoElectrovalvulas
    	ON Dispositivos.electrovalvulaId=EstadoElectrovalvulas.elecId
    INNER JOIN Electrovalvulas
    	ON Dispositivos.electrovalvulaId=Electrovalvulas.electrovalvulaId
    ORDER BY Dispositivos.dispositivoId
```
Esta vista entrega un listado de los dispositivos con su última medición, su electroválvula y su estado de apertura actual. Con la siguente estructura:
|Nombre          |Tipo        |
|----------------|------------|
|dispId          |int(11)     |
|dispNom         |varchar(200)|
|dispUbi         |varchar(200)|
|medId           |int(11)     |
|medFecha        |int(11)     |
|medVal          |varchar(100)|
|elecId          |int(11)     |
|elecNom         |varchar(45) |
|elecApe         |tinyint(4)  |