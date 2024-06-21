<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organizador extends Model
{
    use HasFactory;

    protected $fillable=['nombre'];

    protected $table = 'organizador';

    function eventos(){
        return $this->hasMany(Evento::class);
    }

    public static function validationRules()
    {
        return [
            'nombre'=>'required|min:4|max:500',
        ];
    }
}
