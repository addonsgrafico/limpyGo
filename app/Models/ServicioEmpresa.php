<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// Tabla pivote con atributos propios (llave compuesta empresa_id + servicio_id).
class ServicioEmpresa extends Model
{
    protected $table = 'servicio_empresas';
    protected $primaryKey = null;
    public $incrementing = false;
    public $timestamps = false;
    protected $guarded = [];

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empresa_id');
    }

    public function servicio()
    {
        return $this->belongsTo(Servicio::class, 'servicio_id');
    }
}
