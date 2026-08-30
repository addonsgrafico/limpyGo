<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class Trabajador extends Model
{
    use HasUuid;

    protected $table = 'trabajadores';
    protected $guarded = [];
    public $timestamps = false;

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empresa_id');
    }

    public function ordenes()
    {
        return $this->hasMany(Orden::class, 'trabajador_id');
    }

    public function evidencias()
    {
        return $this->hasMany(Evidencia::class, 'trabajador_id');
    }

    public function calificaciones()
    {
        return $this->hasMany(Calificacion::class, 'trabajador_id');
    }
}
