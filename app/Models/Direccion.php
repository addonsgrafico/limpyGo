<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class Direccion extends Model
{
    use HasUuid;

    protected $table = 'direcciones';
    protected $guarded = [];
    public $timestamps = false;

    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'cliente_id');
    }

    public function ordenes()
    {
        return $this->hasMany(Orden::class, 'direccion_id');
    }
}
