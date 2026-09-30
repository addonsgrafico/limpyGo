<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EmpresaResource\Pages;
use App\Filament\Resources\EmpresaResource\RelationManagers;
use App\Models\Empresa;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class EmpresaResource extends Resource
{
    protected static ?string $model = Empresa::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-office-2';
    protected static ?string $navigationGroup = 'Administración LimpyGo';
    protected static ?int $navigationSort = 1;

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
                Forms\Components\TextInput::make('nombre_comercial')
                    ->required()
                    ->maxLength(150),
                Forms\Components\TextInput::make('nit')
                    ->required()
                    ->maxLength(50),
                Forms\Components\TextInput::make('correo')
                    ->required()
                    ->maxLength(150),
                Forms\Components\TextInput::make('telefono')
                    ->tel()
                    ->maxLength(20)
                    ->default(null),
                Forms\Components\Textarea::make('direccion')
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('estado')
                    ->required()
                    ->maxLength(20)
                    ->default('ACTIVA'),
                Forms\Components\TextInput::make('porcentaje_comision')
                    ->label('Comisión LimpyGo (%)')
                    ->suffix('%')
                    ->required()
                    ->numeric()
                    ->minValue(0)
                    ->maxValue(100)
                    ->default(8.00)
                    ->helperText('Porcentaje que retiene LimpyGo sobre cada servicio completado (ej. 8%)'),
                Forms\Components\DateTimePicker::make('creado_at')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('nombre_comercial')
                    ->label('Empresa')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('nit')
                    ->label('NIT')
                    ->searchable(),
                Tables\Columns\TextColumn::make('correo')
                    ->searchable(),
                Tables\Columns\TextColumn::make('telefono')
                    ->searchable(),
                Tables\Columns\TextColumn::make('estado')
                    ->badge(),
                Tables\Columns\TextInputColumn::make('porcentaje_comision')
                    ->label('Comisión LimpyGo (%)')
                    ->rules(['required', 'numeric', 'min:0', 'max:100'])
                    ->sortable(),
                Tables\Columns\TextColumn::make('creado_at')
                    ->dateTime()
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
            'index' => Pages\ListEmpresas::route('/'),
            'create' => Pages\CreateEmpresa::route('/create'),
            'edit' => Pages\EditEmpresa::route('/{record}/edit'),
        ];
    }
}
