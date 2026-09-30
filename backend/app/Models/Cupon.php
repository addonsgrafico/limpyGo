<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class Cupon extends Model
{
    use HasUuid;

    protected $table = 'cupones';
    protected $guarded = [];
    public $timestamps = false;

    public function ordenes()
    {
        return $this->hasMany(Orden::class, 'cupon_id');
    }
}
