# MEAN-PetStore

Aplicacion Demo implementada como parte del curso Fullstack-Mean

Se trata de una aplicacion para gestionar las citas a una imaginaria clinica veterinaria.

Utilizaremos la pila MEAN para implementar la gestion de Clientes/Mascotas y dar de alta Citas en un Calendario.

# Instalación

```bash
git clone https://github.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore.git
cd MEAN-PetStore
npm install
npm start

```


# Arquitectura Mean: Mongodb + ExpressJs + AngularJs + NodeJs

![Arquitectura Mean](https://raw.githubusercontent.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore/master/public/images/ArquitecturaMean-1.png)

![Arquitectura Mean](https://raw.githubusercontent.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore/master/public/images/ArquitecturaMean-1.jpg)


# El Equipo

Aqui tenemos una foto del equipo de alto rendimiento en un momento de trabajo:

![Foto de grupo](https://raw.githubusercontent.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore/master/public/images/grupo_fullstack.jpg)

# El Proyecto

Se trata de una aplicacion para gestionar las citas a una imaginaria clinica veterinaria.

## Modelo de datos

El principal objeto del modelo de negocio es:

- Cita, que teniendo una 
	-  fecha y hora de inicio y fin, estaria 
	-  relacionada con una sola mascota, que a su vez estaria 
		-  relacionada con un solo cliente.


![Modelo de Datos](https://raw.githubusercontent.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore/master/public/images/modelo-datos.png)

## Diagrama Flujo Clientes-Mascotas

Diagrama de flujo que representa como se dan de alta Mascotas y Clientes en la aplicacion.

![Diagrama Flujo Clientes-Mascotas.png](https://raw.githubusercontent.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore/master/public/images/Diagrama_Flujo_Clientes-Mascotas.png)

## Diagrama Flujo Calendario-Citas

Diagrama de flujo que representa como se dan de alta Citas en el calendario y horario de citas

![Diagrama Flujo Calendario-Citas.png](https://raw.githubusercontent.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore/master/public/images/Diagrama_Flujo_Calendario-Citas.png)

## RESTfull Services API

Esta es una lista completa de los servicios web REST publicados con ExpressJs

| Metodo  |  URL  |  Body  |  Response |
|---|---|---|---|
|  GET  |  api/customers  |  <vacio>  |  res.json([customers]) |
|  GET  |  api/customers/:id  |  <vacio>  |  res.json(customer) |
|  GET  |  api/customers/:id/pets  |  <vacio>  |  res.json(pets) |
|  POST  |  api/customers  |  {JSON}  |  res.json(createdCustomer) |
|  PUT  |  api/customers/:id  |  {JSON}  |  res.json(updatedCustomer) |
|  GET  |  api/pets/:id  |  <vacio>  |  res.json(customerPets) |
|  POST  |  api/pets  |  {JSON}  |  res.json(createdPet) |
|  PUT  |  api/pets/:id  |  {JSON}  |  res.json(updatedPet) |
|  DELETE  |  api/pets/:id  |  {JSON}  |  res.sendStatus(200); //OK |
|  GET  |  api/appointments  |  <vacio>  |  res.json([appointments]) |
|  GET  |  api/appointments/:id  |  <vacio>  |  res.json(appointment) |
|  GET  |  api/appointments/:fromdate/:todate  |  <vacio>  |  res.json(appointments) |
|  POST  |  api/appointments  |  {JSON}  |  res.json(createdAppointment) |
|  PUT  |  api/appointments/:id  |  {JSON}  |  res.json(updateAppointment) |

Ficheros encargados de publicar estas 'routes'

https://github.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore/blob/master/routes/customers.js

https://github.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore/blob/master/routes/pets.js

https://github.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore/blob/master/routes/appointments.js


## Todas las pantallas 

A continuacion el conjunto de pantallas con enlaces a los ficheros de codigo encargados de implementarlas

NOTA: esta es una implementacion funcional de minimos, sin ningun tipo de maquetacion ni detalles cosmeticos. Para implementaciones mas elegantes, ver repositorios de los alumnos.

### Configuracion general
https://github.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore/blob/master/public/app/app.module.js
https://github.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore/blob/master/public/app/app.config.js

### Ventana principal de la aplicacion
https://github.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore/tree/master/public/app/shell

### Navegacion
https://github.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore/tree/master/public/app/navigation-module

### Gestion de clientes y mascotas

#### Lista Cliente
https://github.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore/tree/master/public/app/customerList-module

![Lista Cliente.png](https://raw.githubusercontent.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore/master/public/images/Lista_Cliente.png)

#### Detalle Cliente
https://github.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore/tree/master/public/app/customer-module

![Detalle Cliente.png](https://raw.githubusercontent.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore/master/public/images/Detalle_Cliente.png)

#### Detalle Mascota
https://github.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore/tree/master/public/app/pet-module
![Detalle Mascota.png](https://raw.githubusercontent.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore/master/public/images/Detalle_Mascota.png)

### Gestion de citas


#### Calendario Citas
https://github.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore/tree/master/public/app/appointments-calendar
![Calendario Citas.png](https://raw.githubusercontent.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore/master/public/images/Calendario_Citas.png)

#### Horarios y Detalles Citas
https://github.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore/tree/master/public/app/appointments
https://github.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore/tree/master/public/app/appointments/appointments-day-list
https://github.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore/tree/master/public/app/appointments/appointment-details

![Horarios Citas.png](https://raw.githubusercontent.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore/master/public/images/Horarios_Citas.png)

![Detalles Cita.png](https://raw.githubusercontent.com/Curso-Fullstack-MEAN-Octubre2017/MEAN-PetStore/master/public/images/Detalles_Cita.png)

