<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TrabajadorResource\Pages;
use App\Filament\Resources\TrabajadorResource\RelationManagers;
use App\Models\Trabajador;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TrabajadorResource extends Resource
{
    protected static ?string $model = Trabajador::class;

    protected static ?string $navigationIcon = 'heroicon-o-identification';
    protected static ?string $navigationGroup = 'Operaciones';
    protected static ?int $navigationSort = 2;

    public static function getEloquentQuery(): Builder
    {
        $query = parent::getEloquentQuery();
        /** @var \App\Models\Usuario|null $user */
        $user = auth()->user();

        if ($user && $user->isEmpresaUser()) {
            $query->where('empresa_id', $user->empresa_id);
        }

        return $query;
    }

    public static function form(Form $form): Form
    {
        /** @var \App\Models\Usuario|null $user */
        $user = auth()->user();

        return $form
            ->schema([
                Forms\Components\Select::make('usuario_id')
                    ->label('Usuario (Correo)')
                    ->relationship('usuario', 'correo')
                    ->searchable()
                    ->preload()
                    ->required(),

                $user && $user->isEmpresaUser()
                    ? Forms\Components\Hidden::make('empresa_id')->default($user->empresa_id)
                    : Forms\Components\Select::make('empresa_id')
                        ->label('Empresa')
                        ->relationship('empresa', 'nombre_comercial')
                        ->searchable()
                        ->preload()
                        ->required(),

                Forms\Components\TextInput::make('documento_identidad')
                    ->label('Documento de Identidad / CI')
                    ->required()
                    ->maxLength(50),

                Forms\Components\TextInput::make('telefono')
                    ->tel()
                    ->maxLength(20)
                    ->default(null),

                Forms\Components\TextInput::make('foto_url')
                    ->label('URL de Foto')
                    ->maxLength(255)
                    ->default(null),

                Forms\Components\Toggle::make('antecedentes_verificados')
                    ->label('Antecedentes Verificados')
                    ->default(false),

                Forms\Components\Toggle::make('esta_disponible')
                    ->label('¿Está Disponible?')
                    ->default(true),

                Forms\Components\Select::make('estado')
                    ->options([
                        'ACTIVO' => 'Activo',
                        'INACTIVO' => 'Inactivo',
                        'SUSPENDIDO' => 'Suspendido',
                    ])
                    ->default('ACTIVO')
                    ->required(),

                Forms\Components\TextInput::make('calificacion_promedio')
                    ->numeric()
                    ->default(0.00)
                    ->disabled(),
            ]);
    }

    public static function table(Table $table): Table
    {
        /** @var \App\Models\Usuario|null $user */
        $user = auth()->user();

        return $table
            ->columns([
                Tables\Columns\TextColumn::make('usuario.correo')
                    ->label('Usuario / Correo')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('empresa.nombre_comercial')
                    ->label('Empresa')
                    ->visible(fn () => $user && $user->isSuperAdmin())
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('documento_identidad')
                    ->label('CI / Documento')
                    ->searchable(),

                Tables\Columns\TextColumn::make('telefono')
                    ->searchable(),

                Tables\Columns\IconColumn::make('antecedentes_verificados')
                    ->label('Verificado')
                    ->boolean(),

                Tables\Columns\IconColumn::make('esta_disponible')
                    ->label('Disponible')
                    ->boolean(),

                Tables\Columns\TextColumn::make('calificacion_promedio')
                    ->label('Calificación')
                    ->numeric(2)
                    ->sortable(),

                Tables\Columns\TextColumn::make('estado')
                    ->badge(),
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

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTrabajadors::route('/'),
            'create' => Pages\CreateTrabajador::route('/create'),
            'edit' => Pages\EditTrabajador::route('/{record}/edit'),
        ];
    }
}
