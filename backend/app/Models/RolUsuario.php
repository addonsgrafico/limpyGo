<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RolUsuario extends Model
{
    protected $table = 'roles_usuario';
    protected $primaryKey = 'codigo';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;
    protected $guarded = [];
}
