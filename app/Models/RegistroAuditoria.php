<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class RegistroAuditoria extends Model
{
    use HasUuid;

    protected $table = 'registro_auditorias';
    protected $guarded = [];

    const CREATED_AT = 'creado_at';
    const UPDATED_AT = null;

    protected $casts = [
        'estado_anterior' => 'array',
        'estado_nuevo' => 'array',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }
}
