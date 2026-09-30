<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DireccionResource\Pages;
use App\Filament\Resources\DireccionResource\RelationManagers;
use App\Models\Direccion;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class DireccionResource extends Resource
{
    protected static ?string $model = Direccion::class;

    protected static ?string $navigationIcon = 'heroicon-o-map-pin';
    protected static ?string $navigationGroup = 'Administración LimpyGo';
    protected static ?int $navigationSort = 4;

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
                Forms\Components\TextInput::make('cliente_id')
                    ->required()
                    ->maxLength(36),
                Forms\Components\TextInput::make('alias')
                    ->maxLength(50)
                    ->default(null),
                Forms\Components\Textarea::make('direccion_completa')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('ciudad')
                    ->maxLength(100)
                    ->default(null),
                Forms\Components\TextInput::make('numero_departamento')
                    ->maxLength(20)
                    ->default(null),
                Forms\Components\Textarea::make('referencia')
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('latitud')
                    ->numeric()
                    ->default(null),
                Forms\Components\TextInput::make('longitud')
                    ->numeric()
                    ->default(null),
                Forms\Components\Toggle::make('es_predeterminada')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label('ID')
                    ->searchable(),
                Tables\Columns\TextColumn::make('cliente_id')
                    ->searchable(),
                Tables\Columns\TextColumn::make('alias')
                    ->searchable(),
                Tables\Columns\TextColumn::make('ciudad')
                    ->searchable(),
                Tables\Columns\TextColumn::make('numero_departamento')
                    ->searchable(),
                Tables\Columns\TextColumn::make('latitud')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('longitud')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\IconColumn::make('es_predeterminada')
                    ->boolean(),
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
            'index' => Pages\ListDireccions::route('/'),
            'create' => Pages\CreateDireccion::route('/create'),
            'edit' => Pages\EditDireccion::route('/{record}/edit'),
        ];
    }
}
