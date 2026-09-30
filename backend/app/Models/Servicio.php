<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class Servicio extends Model
{
    use HasUuid;

    protected $table = 'servicios';
    protected $guarded = [];
    public $timestamps = false;

    public function extras()
    {
        return $this->hasMany(ServicioExtra::class, 'servicio_id');
    }

    public function empresas()
    {
        return $this->belongsToMany(Empresa::class, 'servicio_empresas', 'servicio_id', 'empresa_id')
            ->withPivot(['precio_personalizado', 'esta_disponible']);
    }

    public function ambientes()
    {
        return $this->belongsToMany(Ambiente::class, 'precio_ambiente_servicio', 'servicio_id', 'ambiente_id')
            ->withPivot(['precio_adicional', 'tiempo_estimado_minutos']);
    }

    public function ordenes()
    {
        return $this->hasMany(Orden::class, 'servicio_id');
    }
}
