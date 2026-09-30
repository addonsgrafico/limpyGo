<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UsuarioResource\Pages;
use App\Models\Usuario;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Hash;

class UsuarioResource extends Resource
{
    protected static ?string $model = Usuario::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';
    protected static ?string $navigationGroup = 'Administración LimpyGo';
    protected static ?int $navigationSort = 2;

    public static function canViewAny(): bool
    {
        /** @var \App\Models\Usuario|null $user */
        $user = auth()->user();
        return $user && $user->isSuperAdmin();
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('correo')
                    ->email()
                    ->required()
                    ->maxLength(255),

                Forms\Components\TextInput::make('contrasena_hash')
                    ->label('Contraseña')
                    ->password()
                    ->revealable()
                    ->formatStateUsing(fn () => '')
                    ->dehydrateStateUsing(fn ($state) => Hash::make($state))
                    ->dehydrated(fn ($state) => filled($state))
                    ->required(fn (string $context): bool => $context === 'create')
                    ->maxLength(255),

                Forms\Components\Select::make('rol')
                    ->options([
                        'SUPER_ADMIN' => 'Super Administrador (LimpyGo)',
                        'ADMIN_PLATAFORMA' => 'Administrador Plataforma',
                        'EMPRESA_ADMIN' => 'Administrador de Empresa',
                        'EMPRESA_OPERADOR' => 'Operador de Empresa',
                        'TRABAJADOR' => 'Trabajador',
                        'CLIENTE' => 'Cliente',
                    ])
                    ->required(),

                Forms\Components\Select::make('empresa_id')
                    ->relationship('empresa', 'nombre_comercial')
                    ->label('Empresa Aliada')
                    ->placeholder('Ninguna (Usuario Global / LimpyGo)')
                    ->searchable()
                    ->preload()
                    ->nullable(),

                Forms\Components\Toggle::make('esta_activo')
                    ->label('¿Está Activo?')
                    ->default(true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('correo')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('rol')
                    ->badge()
                    ->sortable(),

                Tables\Columns\TextColumn::make('empresa.nombre_comercial')
                    ->label('Empresa')
                    ->placeholder('LimpyGo (Global)')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\IconColumn::make('esta_activo')
                    ->boolean(),

                Tables\Columns\TextColumn::make('creado_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsuarios::route('/'),
            'create' => Pages\CreateUsuario::route('/create'),
            'edit' => Pages\EditUsuario::route('/{record}/edit'),
        ];
    }
}
