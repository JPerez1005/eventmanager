<div align="center" width="100">
  <img src="https://capsule-render.vercel.app/api?color=0:1408d0,50:0860d0,100:08c4d0&height=250&section=header&text=Julian%20Perez%20(FullStack)&fontSize=30&type=waving&fontColor=fefefe&&animation=fadeIn"
  alt="header"/>
</div>

<img align='right' src='https://media.giphy.com/media/bcKmIWkUMCjVm/giphy.gif' width='200"'>


# Estructura de la api rest en laravel

<details align="left">
<summary> <b> <samp> Migración </samp></b></summary>

## migracion

|Crear Tablas|
|-|
|<pre><code class="bash">php artisan make:migration createNombreTable</code></pre>|


|Realizar Las Migraciones|Actualizar Todas las migraciones|eliminar migración anterior|
|-|-|-|
|<pre><code class="bash">php artisan migrate</code></pre>| <pre><code class="bash">php artisan migrate:refresh</code></pre> |<pre><code class="bash">php artisan migrate:rollback</code></pre> |

<hr/>



<p align="center">Migración crea la tabla en la base de datos, aquí se define el nombre de la tabla y los campos que obtiene</p>

### Tipos de campos

```javascript
    $table->id();
    $table->string('nombre',20);
    $table->integer('stock');
    $table->enum('rol',['admin','regular'])->default('regular');
    $table->date('fecha');
    $table->boolean('estado')->default(false);
    // Para las tablas foraneas
    $table->foreignId('autor_id')->constrained('autor')->onDelete('cascade');
    // Es util para fechas de cambios en la db
    $table->timestamps();
```

</details>

<details align="left">
<summary> <b> <samp> Modelo </samp></b></summary>

## modelo

<p align="center">el modelo se comunica con la tabla de la base de datos y con los controladores, aquí hay que definir con cual nombre o que migración hay que conectar simplemente definiendo el nombre, hay dos tipos de modelos con distintas relaciones, uno a muchos y muchos a uno, conexiones de tablas en otras palabras son de la siguiente forma:</p>

<p align="left">NOTA:recordar que el timestamp es necesario para guardar el momento en el que se registró algún dato, no siempre es necesario cabe aclarar.</p>

### tabla padre

```php
    class Autor extends Model
    {
        use HasFactory;

        // se coloca solo si no se pusó timestamp
        // en la migracion del resto no es necesario,
        // este solo es un ejemplo
        public $timestamps = false;
        
        protected $fillable=['nombre'];
        
        protected $table = 'autor';

        function libros(){
            return $this->hasMany(Libro::class);
        }
    }
```

### tabla hijo

```php
    class Libro extends Model
    {
        use HasFactory;

        protected $fillable=['titulo','stock','autor_id'];

        public function autor(){
            return $this->belongsTo(Autor::class,'autor_id');
        }
    }
```
</details>

<details align="left">
<summary> <b> <samp> Validación de datos </samp></b></summary>

## validación de datos

<p align="center">los request son necesarios para la validación de los datos</p>

|Put Request|Store Request|
|-|-|
|<pre><code class="bash">php artisan make:request nombre/PutRequest</code></pre>| <pre><code class="bash">php artisan make:request nombre/StoreRequest</code></pre> |

<h5 align="center">Este sería un ejemplo de codigo para los request</h5>

```php
    class PutRequest extends FormRequest
    {
        public function authorize(): bool
        {
            //recordar cambiar el valor de false a true
            return true;
        }

        public function rules(): array
        {
            return [
                'nombre'=>'required|min:5|max:500',
                // stock mayor a cero
                'stock'=>'required|integer|gt:0',
                // stock menor a cero
                'stock'=>'required|integer|lt:0',
                // fecha antes de la fecha de devolucion
                'fecha_de_prestamo'=>'required|date|before:fecha_de_devolucion',
                // fecha despues de la fecha de prestamo
                'fecha_de_devolucion'=>'required|date|after:fecha_de_prestamo',
                // la foranea
                'autor_id'=>'required|integer',
            ];
        }
    }

```

</details>

<details align="left">
<summary> <b> <samp> Controlador </samp></b></summary>

## controlador

<p align="center">Los controladores se comunican con los modelos y con las rutas del api, a la vez pueden hacer las validaciones rapidamente con los request, el siguiente codigoes un ejemplo de un controlador BASICO, los controladores es un tema muy extenso.</p>


```php
    public function all(){
        return response()->json(Autor::get());
    }

    public function index()
    {
        // Para las paginaciones
        return response()->json(Autor::paginate(10));
    }

    public function store(StoreRequest $request)
    {
        return response()->json(Autor::create($request->validated()));
    }

    public function show(Autor $Autor)
    {
        return response()->json($Autor);
    }

    // Busqueda por nombre
    public function showBySlug(String $nombre)
    {
        $Autor=Autor::where('nombre',$nombre)->firstOrFail();
        return response()->json($Autor);
    }

    public function update(PutRequest $request, Autor $autor)
    {
        $autor->update($request->validated());
        return response()->json($autor);
    }

    public function destroy(Autor $autor)
    {
        $autor->delete();
        return response()->json('ok');
    }
```

<p align="center">A continuacion una funciones un poco mas complejas</p>

```javascript

    public function store(StoreRequest $request)
    {
         // Sobrescribir el valor de 'fecha_de_prestamo' con la fecha actual
         $data = $request->validated();
         $data['fecha_de_prestamo'] = now()->toDateString();
 
         // Actualizar el stock del libro
         $libro = Libro::find($data['libro_id']);
         if ($libro) {
            if($libro['stock']>0){
                $libro->decrement('stock');
                // Crear el registro de préstamo
                $prestamo = Prestamo::create($data);
                return response()->json($prestamo);
            }else{
                throw new \Exception('El libro no está disponible para préstamo.');
            }
         }
    }

    public function update(PutRequest $request, Prestamo $Prestamo)
    {
        $data = $request->validated();

        if($Prestamo['devuelto']==true){
            throw new \Exception('El libro ya fué devuelto, si quiere otro prestamo registrelo');
        }

        $libro = Libro::find($Prestamo['libro_id']);
        if ($data['devuelto']==true) {
            $libro->increment('stock');
            $Prestamo->update($request->validated());
            return response()->json($Prestamo);
        }else{
            throw new \Exception('Acción incomprendida');
        }
    }
```
</details>


<div align="center" width="100">
  <img src="https://capsule-render.vercel.app/api?color=0:1408d0,50:0860d0,100:08c4d0&height=100&section=footer&fontSize=30&type=waving&fontColor=fefefe"
  alt="footer" />
</div>