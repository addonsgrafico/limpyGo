<?php

namespace App\Models;

use App\Traits\HasUuid;
use Filament\Models\Contracts\FilamentUser;
use Filament\Models\Contracts\HasName;
use Filament\Panel;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable implements FilamentUser, HasName
{
    use HasApiTokens, HasUuid;

    protected $table = 'usuarios';

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $guarded = [];
    protected $hidden = ['contrasena_hash'];

    const CREATED_AT = 'creado_at';
    const UPDATED_AT = 'actualizado_at';

    protected function casts(): array
    {
        return [
            'esta_activo' => 'boolean',
        ];
    }

    // 1. Método de la interfaz HasName de Filament
    public function getFilamentName(): string
    {
        return $this->correo ?? 'Usuario';
    }

    // 2. Accesor mágico para interceptar $user->name cuando Filament lo pida
    public function getNameAttribute(): string
    {
        return $this->correo ?? 'Usuario';
    }

    public function getAuthPasswordName()
    {
        return 'contrasena_hash';
    }

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empresa_id');
    }

    public function isSuperAdmin(): bool
    {
        return in_array($this->rol, ['SUPER_ADMIN', 'ADMIN_PLATAFORMA']);
    }

    public function isEmpresaUser(): bool
    {
        return in_array($this->rol, ['EMPRESA_ADMIN', 'EMPRESA_OPERADOR']);
    }

    public function getEmpresaId(): ?string
    {
        return $this->empresa_id;
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return (bool) $this->esta_activo && ($this->isSuperAdmin() || $this->isEmpresaUser());
    }
}
