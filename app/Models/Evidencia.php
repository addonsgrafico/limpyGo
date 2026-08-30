<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class Evidencia extends Model
{
    use HasUuid;

    protected $table = 'evidencias';
    protected $guarded = [];
    public $timestamps = false;

    public function orden()
    {
        return $this->belongsTo(Orden::class, 'orden_id');
    }

    public function trabajador()
    {
        return $this->belongsTo(Trabajador::class, 'trabajador_id');
    }
}
