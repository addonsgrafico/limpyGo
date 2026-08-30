<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class Calificacion extends Model
{
    use HasUuid;

    protected $table = 'calificaciones';
    protected $guarded = [];

    const CREATED_AT = 'creado_at';
    const UPDATED_AT = null;

    public function orden()
    {
        return $this->belongsTo(Orden::class, 'orden_id');
    }

    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'cliente_id');
    }

    public function trabajador()
    {
        return $this->belongsTo(Trabajador::class, 'trabajador_id');
    }
}
