<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ClienteResource\Pages;
use App\Filament\Resources\ClienteResource\RelationManagers;
use App\Models\Cliente;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ClienteResource extends Resource
{
    protected static ?string $model = Cliente::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';
    protected static ?string $navigationGroup = 'Operaciones';
    protected static ?int $navigationSort = 3;

    public static function getEloquentQuery(): Builder
    {
        $query = parent::getEloquentQuery();
        /** @var \App\Models\Usuario|null $user */
        $user = auth()->user();

        if ($user && $user->isEmpresaUser()) {
            $query->whereHas('ordenes', fn ($q) => $q->where('empresa_id', $user->empresa_id));
        }

        return $query;
    }

    public static function form(Form $form): Form
{
    return $form
        ->schema([
            // Desplegable para seleccionar el usuario de la lista
            Forms\Components\Select::make('usuario_id')
                ->relationship('usuario', 'correo') // Muestra el correo del usuario
                ->searchable()
                ->preload()
                ->required(),

            Forms\Components\TextInput::make('nombres')
                ->required()
                ->maxLength(255),

            Forms\Components\TextInput::make('apellidos')
                ->required()
                ->maxLength(255),

            Forms\Components\TextInput::make('telefono')
                ->tel()
                ->maxLength(20),

            // Oculto al crear, solo visible o editable si es estrictamente necesario
            Forms\Components\TextInput::make('calificacion_promedio')
                ->numeric()
                ->default(0.00)
                ->hiddenOn('create'),
        ]);
}

public static function table(Table $table): Table
{
    return $table
        ->columns([
            Tables\Columns\TextColumn::make('usuario.correo')
                ->label('Usuario')
                ->searchable(),

            Tables\Columns\TextColumn::make('nombres')
                ->searchable(),

            Tables\Columns\TextColumn::make('apellidos')
                ->searchable(),

            Tables\Columns\TextColumn::make('telefono'),

            // Muestra la calificación en la tabla como solo lectura
            Tables\Columns\TextColumn::make('calificacion_promedio')
                ->sortable(),

            Tables\Columns\TextColumn::make('creado_at')
                ->dateTime()
                ->sortable(),
        ]);
}

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListClientes::route('/'),
            'create' => Pages\CreateCliente::route('/create'),
            'edit' => Pages\EditCliente::route('/{record}/edit'),
        ];
    }
}
