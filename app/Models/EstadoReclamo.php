<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EstadoReclamo extends Model
{
    protected $table = 'estados_reclamo';
    protected $primaryKey = 'codigo';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;
    protected $guarded = [];
}
