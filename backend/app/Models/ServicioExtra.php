<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class ServicioExtra extends Model
{
    use HasUuid;

    protected $table = 'servicio_extras';
    protected $guarded = [];
    public $timestamps = false;

    public function servicio()
    {
        return $this->belongsTo(Servicio::class, 'servicio_id');
    }
}
