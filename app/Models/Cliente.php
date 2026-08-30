<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasUuid;

    protected $table = 'clientes';
    protected $guarded = [];
    public $timestamps = false; // el diagrama no define timestamps para Cliente

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    public function direcciones()
    {
        return $this->hasMany(Direccion::class, 'cliente_id');
    }

    public function ordenes()
    {
        return $this->hasMany(Orden::class, 'cliente_id');
    }

    public function reclamos()
    {
        return $this->hasMany(Reclamo::class, 'cliente_id');
    }

    public function calificaciones()
    {
        return $this->hasMany(Calificacion::class, 'cliente_id');
    }
}
