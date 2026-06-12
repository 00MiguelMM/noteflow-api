# Seguridad y SQL Injection

## ¿Qué es SQL Injection?

SQL Injection es una vulnerabilidad que ocurre cuando los datos introducidos por el usuario se insertan directamente en una consulta SQL sin validación ni protección.

Por ejemplo:

```javascript
const title = req.body.title;
const query = "SELECT * FROM notes WHERE title = '" + title + "'";
```

Si un atacante introduce el siguiente valor:

```text
'; DROP TABLE notes;--
```

La consulta resultante podría ejecutar instrucciones no deseadas sobre la base de datos, incluyendo la eliminación de tablas o el acceso a información sensible.

## Cómo prevenir SQL Injection

La forma recomendada de prevenir esta vulnerabilidad es utilizar consultas parametrizadas.

Ejemplo seguro:

```javascript
const query = "SELECT * FROM notes WHERE title = $1";
await db.query(query, [req.body.title]);
```

En este caso, la estructura de la consulta y los valores se envían por separado. La base de datos interpreta el parámetro únicamente como un dato y nunca como código SQL ejecutable.

## Variables de entorno

Las variables de entorno permiten almacenar información sensible fuera del código fuente de la aplicación.

Ejemplo:

```env
DATABASE_URL=postgresql://usuario:contraseña@servidor/basedatos
```

Gracias a las variables de entorno, las credenciales pueden modificarse sin cambiar el código de la aplicación.

## Protección del connection string

El connection string contiene información sensible como el usuario, la contraseña y la dirección de la base de datos.

Por motivos de seguridad, nunca debe incluirse directamente en el código ni subirse a repositorios públicos de GitHub.

La práctica recomendada consiste en almacenarlo en archivos como `.env.local`, incluidos en `.gitignore`, para evitar su publicación accidental.