<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// Tabla pivote con atributos propios (llave compuesta ambiente_id + servicio_id).
class PrecioAmbienteServicio extends Model
{
    protected $table = 'precio_ambiente_servicio';
    protected $primaryKey = null;
    public $incrementing = false;
    public $timestamps = false;
    protected $guarded = [];

    public function ambiente()
    {
        return $this->belongsTo(Ambiente::class, 'ambiente_id');
    }

    public function servicio()
    {
        return $this->belongsTo(Servicio::class, 'servicio_id');
    }
}
