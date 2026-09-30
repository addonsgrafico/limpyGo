<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// Tabla pivote con atributos propios (llave compuesta orden_id + servicio_extra_id).
class SeleccionExtraOrden extends Model
{
    protected $table = 'seleccion_extra_orden';
    protected $primaryKey = null;
    public $incrementing = false;
    public $timestamps = false;
    protected $guarded = [];

    public function orden()
    {
        return $this->belongsTo(Orden::class, 'orden_id');
    }

    public function servicioExtra()
    {
        return $this->belongsTo(ServicioExtra::class, 'servicio_extra_id');
    }
}
