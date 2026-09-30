<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NotificacionResource\Pages;
use App\Filament\Resources\NotificacionResource\RelationManagers;
use App\Models\Notificacion;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class NotificacionResource extends Resource
{
    protected static ?string $model = Notificacion::class;

    protected static ?string $navigationIcon = 'heroicon-o-bell';
    protected static ?string $navigationGroup = 'Operaciones';
    protected static ?int $navigationSort = 4;

    public static function getEloquentQuery(): Builder
    {
        $query = parent::getEloquentQuery();
        /** @var \App\Models\Usuario|null $user */
        $user = auth()->user();

        if ($user && $user->isEmpresaUser()) {
            $query->whereHas('usuario', fn ($q) => $q->where('empresa_id', $user->empresa_id));
        }

        return $query;
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('usuario_id')
                    ->required()
                    ->maxLength(36),
                Forms\Components\TextInput::make('titulo')
                    ->required()
                    ->maxLength(200),
                Forms\Components\Textarea::make('mensaje')
                    ->required()
                    ->columnSpanFull(),
                Forms\Components\Toggle::make('fue_leida')
                    ->required(),
                Forms\Components\DateTimePicker::make('enviado_at')
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
                Tables\Columns\TextColumn::make('usuario_id')
                    ->searchable(),
                Tables\Columns\TextColumn::make('titulo')
                    ->searchable(),
                Tables\Columns\IconColumn::make('fue_leida')
                    ->boolean(),
                Tables\Columns\TextColumn::make('enviado_at')
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
            'index' => Pages\ListNotificacions::route('/'),
            'create' => Pages\CreateNotificacion::route('/create'),
            'edit' => Pages\EditNotificacion::route('/{record}/edit'),
        ];
    }
}
