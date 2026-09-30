<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EstadoPago extends Model
{
    protected $table = 'estados_pago';
    protected $primaryKey = 'codigo';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;
    protected $guarded = [];
}
