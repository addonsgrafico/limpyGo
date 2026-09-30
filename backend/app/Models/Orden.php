<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class Orden extends Model
{
    use HasUuid;

    protected $table = 'ordenes';
    protected $guarded = [];

    const CREATED_AT = 'creado_at';
    const UPDATED_AT = null; // el diagrama no define actualizado_at para Orden

    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'cliente_id');
    }

    public function direccion()
    {
        return $this->belongsTo(Direccion::class, 'direccion_id');
    }

    public function servicio()
    {
        return $this->belongsTo(Servicio::class, 'servicio_id');
    }

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empresa_id');
    }

    public function trabajador()
    {
        return $this->belongsTo(Trabajador::class, 'trabajador_id');
    }

    public function cupon()
    {
        return $this->belongsTo(Cupon::class, 'cupon_id');
    }

    public function estadoActualCatalogo()
    {
        return $this->belongsTo(EstadoOrden::class, 'estado_actual', 'codigo');
    }

    public function ambientes()
    {
        return $this->belongsToMany(Ambiente::class, 'seleccion_ambiente_orden', 'orden_id', 'ambiente_id')
            ->withPivot(['cantidad', 'precio_unitario_cobrado']);
    }

    public function extras()
    {
        return $this->belongsToMany(ServicioExtra::class, 'seleccion_extra_orden', 'orden_id', 'servicio_extra_id')
            ->withPivot(['precio_cobrado']);
    }

    public function historialEstados()
    {
        return $this->hasMany(HistorialEstadoOrden::class, 'orden_id');
    }

    public function pagos()
    {
        return $this->hasMany(Pago::class, 'orden_id');
    }

    public function comision()
    {
        return $this->hasOne(Comision::class, 'orden_id');
    }

    public function evidencias()
    {
        return $this->hasMany(Evidencia::class, 'orden_id');
    }

    public function calificacion()
    {
        return $this->hasOne(Calificacion::class, 'orden_id');
    }

    public function reclamos()
    {
        return $this->hasMany(Reclamo::class, 'orden_id');
    }
}
