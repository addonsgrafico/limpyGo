<?php

namespace App\Models;

use App\Traits\HasUuid;
use Illuminate\Database\Eloquent\Model;

class WebhookPago extends Model
{
    use HasUuid;

    protected $table = 'webhook_pagos';
    protected $guarded = [];
    public $timestamps = false;
    protected $casts = [
        'datos_crudos' => 'array',
    ];

    public function pago()
    {
        return $this->belongsTo(Pago::class, 'pago_id');
    }
}
