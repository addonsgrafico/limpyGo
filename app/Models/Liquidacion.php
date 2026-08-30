<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class Liquidacion extends Model
{
    use HasUuid;

    protected $table = 'liquidaciones';
    protected $guarded = [];
    public $timestamps = false;

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empresa_id');
    }
}
