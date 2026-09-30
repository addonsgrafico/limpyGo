<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    use HasUuid;

    protected $table = 'pagos';
    protected $guarded = [];
    public $timestamps = false;

    public function orden()
    {
        return $this->belongsTo(Orden::class, 'orden_id');
    }

    public function webhooks()
    {
        return $this->hasMany(WebhookPago::class, 'pago_id');
    }
}
