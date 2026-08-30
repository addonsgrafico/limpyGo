<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// Tabla pivote con atributos propios (llave compuesta orden_id + ambiente_id).
class SeleccionAmbienteOrden extends Model
{
    protected $table = 'seleccion_ambiente_orden';
    protected $primaryKey = null;
    public $incrementing = false;
    public $timestamps = false;
    protected $guarded = [];

    public function orden()
    {
        return $this->belongsTo(Orden::class, 'orden_id');
    }

    public function ambiente()
    {
        return $this->belongsTo(Ambiente::class, 'ambiente_id');
    }
}
