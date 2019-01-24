# WebAutomationScripts

Scripts para automatizar la navegacion web

## Como desarrollar tu script?

Son dos pasos: 
* Lo desarrollás interactivamente, probando encontrar elementos, extraer datos, etc.
* Probas que funcione automáticamente llamando Nav.run_step

1. Navega hasta "la mejor url que puedas", con filtros, etc.
2. Ya tenes tu primer paso, anota tu url como ```Nav.goToUrl('https://elsitio.com/x/y?lenguaje=php');```
3. El desafío es reproducir las condiciones cuando se ejecute automático! Para eso
    * Cada vez que navegás a otra página pegá en la consola del browser [la librería](https://raw.githubusercontent.com/mauriciocap/WebAutomationScripts/master/lib/lib.js)
    * Empezá con ```Nav.set_recording(false)``` para que las acciones se ejecuten de inmediato.
    * Usá el objeto ```Nav``` ej. para apretar botones, encontrar elementos, y funciones si hacen falta.
4. En __la librería__ vas a ver que funciones podés llamar, y sino agregá las tuyas y llamalas con ```Nav.call("mifuncion","param1", "param2")```
5. Tus funciones van a recibir como último parámetro un objeto "estado" que en la ejecución automática es __persistente__ incluso aunque navegues entre páginas.
6. Entonces tu _trabajo_ es ir navegando por la(s) página(s) y consiguiendo datos con el objeto ```Nav```  y tus funciones, y guardando lo que haces en un .txt para después repetirlo.
7. Cuando tengas datos para guardar llamás ```srv_data_save```.

Lo hice así para que puedas programar
* Sin ocuparte de mantener el estado aunque navegues entre páginas.
* Sin poner esperas y "setTimeout" entre operaciones que pueden demorar.

Si tus funciones devuelven ```false``` las van a llamar de nuevo. Podés poner un ```if``` al principio y si todavía no cargó el elemento que esperabas devolvés ```false``` y sabés que la van a llamar de nuevo en unos segundos.

Cuando terminás, lo que estás pegando en la consola del browser va a ser algo así:

```
...
... (código de la librería) ...
...

//S: mi script para sacar datos de elsitio.com

Nav.goToUrl('https://elsitio.com/x/y?lenguaje=php');
Nav.clickXPath("//a[contains(.,'php')]");
Nav.call("mifuncionQueLimpiaYGuarda");

```

Y para probarlo pegás todo eso en la consola del browser y ejecutas...

```
Nav.run_step();
Nav.run_step();
... etc ...
```

En cada paso te va a mostrar lo mismo que guarda la variable de estado, por que paso va y si terminó.
Cuando llegués al paso que guarda los datos los vas a ver en la consola.


