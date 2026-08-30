<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    use HasUuid;

    protected $table = 'empresas';
    protected $guarded = [];

    const CREATED_AT = 'creado_at';
    const UPDATED_AT = null; // el diagrama no define actualizado_at para Empresa

    public function trabajadores()
    {
        return $this->hasMany(Trabajador::class, 'empresa_id');
    }

    public function zonasCobertura()
    {
        return $this->hasMany(ZonaCobertura::class, 'empresa_id');
    }

    public function servicios()
    {
        return $this->belongsToMany(Servicio::class, 'servicio_empresas', 'empresa_id', 'servicio_id')
            ->withPivot(['precio_personalizado', 'esta_disponible']);
    }

    public function ordenes()
    {
        return $this->hasMany(Orden::class, 'empresa_id');
    }

    public function liquidaciones()
    {
        return $this->hasMany(Liquidacion::class, 'empresa_id');
    }
}
