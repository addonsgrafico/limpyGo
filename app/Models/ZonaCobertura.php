<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class ZonaCobertura extends Model
{
    use HasUuid;

    protected $table = 'zona_coberturas';
    protected $guarded = [];
    public $timestamps = false;
    protected $casts = [
        'poligono_coordenadas' => 'array',
    ];

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empresa_id');
    }
}
