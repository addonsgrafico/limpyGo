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
    // Al editar, no carga el hash actual en el input por seguridad
    ->formatStateUsing(fn () => '')
    // Solo aplica el Hash si el usuario escribió algo en el input
    ->dehydrateStateUsing(fn ($state) => Hash::make($state))
    ->dehydrated(fn ($state) => filled($state))
    // Obligatorio al crear, opcional al editar
    ->required(fn (string $context): bool => $context === 'create')
    ->maxLength(255),

                Forms\Components\Select::make('rol')
                    ->options([
                        'ADMIN' => 'Administrador',
                        'CLIENTE' => 'Cliente',
                        'TRABAJADOR' => 'Trabajador',
                    ])
                    ->required(),

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
