<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class Comision extends Model
{
    use HasUuid;

    protected $table = 'comisiones';
    protected $guarded = [];
    public $timestamps = false;

    public function orden()
    {
        return $this->belongsTo(Orden::class, 'orden_id');
    }
}
