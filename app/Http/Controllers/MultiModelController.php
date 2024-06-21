<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MultiModelController extends Controller
{
    // Lista de modelos que se pueden usar en este controlador
    protected $models = [
        'organizador' => \App\Models\Organizador::class,
    ];

    // Método para obtener el modelo basado en el tipo
    protected function getModel($type)
    {
        if (!isset($this->models[$type])) {
            abort(404, "Modelo no encontrado.");
        }
        return new $this->models[$type];
    }

    // Listar todos los registros
    public function all($type)
    {
        $model = $this->getModel($type);
        return response()->json($model::all());
    }

    // Paginación
    public function index(Request $request, $type)
    {
        $model = $this->getModel($type);
        $query = $model::query();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('nombre', 'like', "%{$search}%");
        }

        return response()->json($query->paginate(5));
    }


    // Crear un nuevo registro
    public function store(Request $request, $type)
    {
        $model = $this->getModel($type);
        $validatedData = $request->validate($model::validationRules()); // Aquí deberías definir los métodos de validación en cada modelo
        $instance = $model::create($validatedData);
        return response()->json(['message' => ucfirst($type) . ' creado con éxito', 'data' => $instance], 201);
    }

    // Mostrar un registro específico
    public function show($type, $id)
    {
        $model = $this->getModel($type);
        $instance = $model::findOrFail($id);
        return response()->json($instance);
    }

    // Actualizar un registro
    public function update(Request $request, $type, $id)
    {
        $model = $this->getModel($type);
        $instance = $model::findOrFail($id);
        $validatedData = $request->validate($model::validationRules());
        $instance->update($validatedData);
        return response()->json($instance);
    }

    // Eliminar un registro
    public function destroy($type, $id)
    {
        $model = $this->getModel($type);
        $instance = $model::findOrFail($id);
        $instance->delete();
        return response()->json(['message' => ucfirst($type) . ' eliminado con éxito']);
    }
}