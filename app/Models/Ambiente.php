<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class Ambiente extends Model
{
    use HasUuid;

    protected $table = 'ambientes';
    protected $guarded = [];
    public $timestamps = false;

    public function servicios()
    {
        return $this->belongsToMany(Servicio::class, 'precio_ambiente_servicio', 'ambiente_id', 'servicio_id')
            ->withPivot(['precio_adicional', 'tiempo_estimado_minutos']);
    }

    public function ordenes()
    {
        return $this->belongsToMany(Orden::class, 'seleccion_ambiente_orden', 'ambiente_id', 'orden_id')
            ->withPivot(['cantidad', 'precio_unitario_cobrado']);
    }
}
