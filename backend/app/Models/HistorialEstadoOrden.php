<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class HistorialEstadoOrden extends Model
{
    use HasUuid;

    protected $table = 'historial_estado_orden';
    protected $guarded = [];
    public $timestamps = false;

    public function orden()
    {
        return $this->belongsTo(Orden::class, 'orden_id');
    }

    public function modificadoPor()
    {
        return $this->belongsTo(Usuario::class, 'modificado_por');
    }
}
