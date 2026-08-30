<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrdenResource\Pages;
use App\Filament\Resources\OrdenResource\RelationManagers;
use App\Models\Orden;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class OrdenResource extends Resource
{
    protected static ?string $model = Orden::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('codigo_seguimiento')
                    ->required()
                    ->maxLength(12),
                Forms\Components\TextInput::make('cliente_id')
                    ->required()
                    ->maxLength(36),
                Forms\Components\TextInput::make('direccion_id')
                    ->required()
                    ->maxLength(36),
                Forms\Components\TextInput::make('servicio_id')
                    ->required()
                    ->maxLength(36),
                Forms\Components\TextInput::make('empresa_id')
                    ->maxLength(36)
                    ->default(null),
                Forms\Components\TextInput::make('trabajador_id')
                    ->maxLength(36)
                    ->default(null),
                Forms\Components\TextInput::make('cupon_id')
                    ->maxLength(36)
                    ->default(null),
                Forms\Components\TextInput::make('estado_actual')
                    ->required()
                    ->maxLength(40)
                    ->default('CREADA'),
                Forms\Components\DatePicker::make('fecha_programada')
                    ->required(),
                Forms\Components\TextInput::make('hora_programada')
                    ->required(),
                Forms\Components\TextInput::make('costo_traslado')
                    ->required()
                    ->numeric()
                    ->default(0.00),
                Forms\Components\TextInput::make('monto_subtotal')
                    ->required()
                    ->numeric()
                    ->default(0.00),
                Forms\Components\TextInput::make('monto_descuento')
                    ->required()
                    ->numeric()
                    ->default(0.00),
                Forms\Components\TextInput::make('monto_total')
                    ->required()
                    ->numeric()
                    ->default(0.00),
                Forms\Components\Textarea::make('observaciones')
                    ->columnSpanFull(),
                Forms\Components\DateTimePicker::make('creado_at')
                    ->required(),
                Forms\Components\DateTimePicker::make('iniciado_at'),
                Forms\Components\DateTimePicker::make('finalizado_at'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label('ID')
                    ->searchable(),
                Tables\Columns\TextColumn::make('codigo_seguimiento')
                    ->searchable(),
                Tables\Columns\TextColumn::make('cliente_id')
                    ->searchable(),
                Tables\Columns\TextColumn::make('direccion_id')
                    ->searchable(),
                Tables\Columns\TextColumn::make('servicio_id')
                    ->searchable(),
                Tables\Columns\TextColumn::make('empresa_id')
                    ->searchable(),
                Tables\Columns\TextColumn::make('trabajador_id')
                    ->searchable(),
                Tables\Columns\TextColumn::make('cupon_id')
                    ->searchable(),
                Tables\Columns\TextColumn::make('estado_actual')
                    ->searchable(),
                Tables\Columns\TextColumn::make('fecha_programada')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('hora_programada'),
                Tables\Columns\TextColumn::make('costo_traslado')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('monto_subtotal')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('monto_descuento')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('monto_total')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('creado_at')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('iniciado_at')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('finalizado_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                //
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
            'index' => Pages\ListOrdens::route('/'),
            'create' => Pages\CreateOrden::route('/create'),
            'edit' => Pages\EditOrden::route('/{record}/edit'),
        ];
    }
}
