<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class Notificacion extends Model
{
    use HasUuid;

    protected $table = 'notificaciones';
    protected $guarded = [];
    public $timestamps = false;

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }
}
