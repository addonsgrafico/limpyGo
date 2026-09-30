<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EstadoOrden extends Model
{
    protected $table = 'estados_orden';
    protected $primaryKey = 'codigo';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;
    protected $guarded = [];
}
