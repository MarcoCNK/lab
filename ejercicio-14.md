Implementación de Logger en Node.js
Clase Log
Clase que representa un log con las siguientes propiedades:

level: Puede ser uno de los valores 'debug' | 'info' | 'warn' | 'error'
module: Nombre del módulo desde donde se emite el log (por ejemplo, 'app.js')
message: Mensaje del log
timestamp: Fecha y hora en que se crea el log
id: Número único que identifica el log

Clase LoggerManager
Esta clase gestiona un conjunto de logs y realiza operaciones sobre ellos. Contiene las siguientes propiedades:

logs: Arreglo de objetos de tipo Log
id_counter: Contador para asignar un identificador único a cada log

Métodos
#### addLog(level: 'debug' | 'info' | 'warn' | 'error', module: string, message: string)
Método que permite agregar un log. Crea un archivo de texto que contiene la información del log en la carpeta /logs.

Formato del mensaje en el archivo:

[ID: 1] [INFO] [app.js] [2022-01-01 00:00:00] Usuario suscripto con éxito

Ejemplo de uso:
```javascript
const logger = new LoggerManager();
logger.addLog('info', 'app.js', 'Usuario suscripto con éxito');
logger.addLog('error', 'app.js', 'Error al registrar usuario');