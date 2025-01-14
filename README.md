# Gtmotive

## Demo

Puedes acceder a la demo de la aplicación aquí: [Demo](https://hectorn1192.github.io/app-gtmotive/)


## Description
El proyecto incluye diversas formas de mostrar y gestionar información para demostrar versatilidad en el manejo de datos. 

Se incluyen componentes compartidos, como una tabla dinámica que adapta la información recibida y un navbar global para garantizar consistencia y reutilización en toda la aplicación.

Además, se implementan interceptores para manejar errores y mostrar un spinner durante la carga de datos, mejorando la experiencia del usuario. 


## Tecnologías Utilizadas

- **Angular**: Framework utilizado para desarrollar la aplicación.

- **Signal y Signal Store**: Manejan datos de forma reactiva y simplifican el manejo del estado local.

    - Signal gestiona la reactividad de los datos, tanto en elementos estáticos como dinámicos, por ejemplo, en inputs entre componentes.
    - En la tabla de modelos de vehículos, Signal Store gestiona el listado y muestra un ejemplo práctico de un store moderno.

- **NgRx Store**: Gestiona el estado global de la aplicación.

    - La store de NgRx se utiliza a nivel global para manejar tanto el listado principal de las marcas como el listado de tipos de vehículos.

- **RxJS**: Maneja las llamadas a la API y los flujos de datos asíncronos en tiempo real.

- **Material Design**: Proporciona a la aplicación un diseño moderno, consistente y fácil de usar.


## Instalación

```bash
  git clone https://github.com/HectorN1192/app-gtmotive.git
  cd app-gtmotive
  npm install
  npm run start
```
## Ejecutar Tests

```bash
  npm run test
```

## API

#### - Obtener listado de marcas

```http
  GET https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json
```

#### - Obtener listado de tipos de vehiculo filtrados por Id de Marca

```http
  GET https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${id}?format=json
```

| Parámetro | Tipo     | Descripcion                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Requerido**. Id Marca |

#### - Obtener listado de modelos de vehiculo filtrados por Id de Marca

```http
  GET https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/${id}?format=json
```

| Parámetro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Requerido**. Id Marca |

