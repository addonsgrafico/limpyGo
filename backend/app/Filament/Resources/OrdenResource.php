<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrdenResource\Pages;
use App\Models\Empresa;
use App\Models\HistorialEstadoOrden;
use App\Models\Orden;
use App\Models\Trabajador;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class OrdenResource extends Resource
{
    protected static ?string $model = Orden::class;

    protected static ?string $navigationIcon = 'heroicon-o-clipboard-document-list';
    protected static ?string $navigationGroup = 'Operaciones';
    protected static ?int $navigationSort = 1;

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
        return $form
            ->schema([
                Forms\Components\Section::make('Información del Servicio')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('codigo_seguimiento')
                            ->label('Código de Seguimiento')
                            ->disabled()
                            ->required()
                            ->maxLength(12),
                        Forms\Components\Select::make('estado_actual')
                            ->label('Estado Actual')
                            ->options([
                                'PENDIENTE_ASIGNACION_TRABAJADOR' => '⏳ Pendiente Asignación por Empresa',
                                'TRABAJADOR_ASIGNADO' => '👷 Trabajador Asignado',
                                'EN_CAMINO' => '🚗 En Camino',
                                'LLEGUE' => '📍 Llegó al Lugar',
                                'EN_PROCESO' => '🧹 En Proceso de Limpieza',
                                'COMPLETADA' => '✅ Completada con Éxito',
                                'CANCELADA' => '❌ Cancelada',
                            ])
                            ->required(),
                        Forms\Components\Select::make('empresa_id')
                            ->label('Empresa de Limpieza')
                            ->options(fn () => Empresa::pluck('nombre_comercial', 'id'))
                            ->reactive()
                            ->searchable()
                            ->required(),
                        Forms\Components\Select::make('trabajador_id')
                            ->label('Trabajador Designado (Personal)')
                            ->options(function (Forms\Get $get, ?Orden $record) {
                                $empresaId = $get('empresa_id') ?? $record?->empresa_id;
                                if (! $empresaId) {
                                    return [];
                                }
                                return Trabajador::where('empresa_id', $empresaId)
                                    ->with('usuario')
                                    ->get()
                                    ->mapWithKeys(function ($t) {
                                        $nombre = $t->usuario ? ($t->usuario->nombres . ' ' . $t->usuario->apellidos) : ('Trabajador #' . substr($t->id, 0, 8));
                                        return [$t->id => $nombre . ' (' . ($t->esta_disponible ? 'Disponible' : 'Ocupado') . ')'];
                                    });
                            })
                            ->searchable()
                            ->placeholder('⚠️ Seleccione el trabajador de la empresa'),
                        Forms\Components\DatePicker::make('fecha_programada')
                            ->label('Fecha Programada')
                            ->required(),
                        Forms\Components\TextInput::make('hora_programada')
                            ->label('Hora Programada')
                            ->required(),
                    ]),

                Forms\Components\Section::make('Costos y Cobro')
                    ->columns(3)
                    ->schema([
                        Forms\Components\TextInput::make('costo_traslado')
                            ->label('Costo Traslado (BOB)')
                            ->numeric()
                            ->default(15.00),
                        Forms\Components\TextInput::make('monto_subtotal')
                            ->label('Subtotal (BOB)')
                            ->numeric()
                            ->default(0.00),
                        Forms\Components\TextInput::make('monto_total')
                            ->label('Total a Cobrar (BOB)')
                            ->numeric()
                            ->default(0.00),
                        Forms\Components\Textarea::make('observaciones')
                            ->label('Observaciones del Cliente')
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('codigo_seguimiento')
                    ->label('Código')
                    ->searchable()
                    ->copyable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('empresa.nombre_comercial')
                    ->label('Empresa')
                    ->badge()
                    ->color('gray')
                    ->searchable(),

                Tables\Columns\TextColumn::make('trabajador.usuario.nombres')
                    ->label('Trabajador Asignado')
                    ->formatStateUsing(function ($state, Orden $record) {
                        if ($record->trabajador && $record->trabajador->usuario) {
                            return '👷 ' . $record->trabajador->usuario->nombres . ' ' . $record->trabajador->usuario->apellidos;
                        }
                        return '⚠️ Sin Asignar';
                    })
                    ->badge()
                    ->color(fn (Orden $record) => $record->trabajador_id ? 'success' : 'warning'),

                Tables\Columns\TextColumn::make('estado_actual')
                    ->label('Estado')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'PENDIENTE_ASIGNACION_TRABAJADOR' => 'warning',
                        'TRABAJADOR_ASIGNADO' => 'info',
                        'EN_CAMINO' => 'primary',
                        'LLEGUE' => 'info',
                        'EN_PROCESO' => 'warning',
                        'COMPLETADA' => 'success',
                        'CANCELADA' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'PENDIENTE_ASIGNACION_TRABAJADOR' => '⏳ Pendiente Asignación',
                        'TRABAJADOR_ASIGNADO' => '👷 Asignado',
                        'EN_CAMINO' => '🚗 En Camino',
                        'LLEGUE' => '📍 En Puerta',
                        'EN_PROCESO' => '🧹 En Proceso',
                        'COMPLETADA' => '✅ Completada',
                        'CANCELADA' => '❌ Cancelada',
                        default => $state,
                    }),

                Tables\Columns\TextColumn::make('fecha_programada')
                    ->label('Fecha')
                    ->date()
                    ->sortable(),

                Tables\Columns\TextColumn::make('hora_programada')
                    ->label('Hora'),

                Tables\Columns\TextColumn::make('monto_total')
                    ->label('Monto Total')
                    ->money('BOB')
                    ->sortable(),

                Tables\Columns\TextColumn::make('creado_at')
                    ->label('Solicitado')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('estado_actual')
                    ->options([
                        'PENDIENTE_ASIGNACION_TRABAJADOR' => 'Pendiente de Asignación',
                        'TRABAJADOR_ASIGNADO' => 'Trabajador Asignado',
                        'EN_CAMINO' => 'En Camino',
                        'EN_PROCESO' => 'En Proceso',
                        'COMPLETADA' => 'Completada',
                    ]),
            ])
            ->actions([
                // Acción para que la empresa designe qué trabajador va a ir
                Tables\Actions\Action::make('designarTrabajador')
                    ->label('Designar Trabajador')
                    ->icon('heroicon-m-user-plus')
                    ->color('warning')
                    ->button()
                    ->visible(fn (Orden $record) => in_array($record->estado_actual, ['CREADA', 'EMPRESA_ASIGNADA', 'PENDIENTE_ASIGNACION_TRABAJADOR']) || empty($record->trabajador_id))
                    ->modalHeading('Designar Personal de Limpieza')
                    ->modalDescription('Seleccione al trabajador de su empresa que acudirá a realizar el servicio.')
                    ->form([
                        Forms\Components\Select::make('trabajador_id')
                            ->label('Personal de Limpieza')
                            ->options(function (Orden $record) {
                                return Trabajador::where('empresa_id', $record->empresa_id)
                                    ->with('usuario')
                                    ->get()
                                    ->mapWithKeys(function ($t) {
                                        $nombre = $t->usuario ? ($t->usuario->nombres . ' ' . $t->usuario->apellidos) : ('Trabajador #' . substr($t->id, 0, 8));
                                        $disp = $t->esta_disponible ? '🟢 Disponible' : '🟡 En turno';
                                        return [$t->id => "{$nombre} — {$disp}"];
                                    });
                            })
                            ->required()
                            ->searchable(),
                    ])
                    ->action(function (Orden $record, array $data): void {
                        $estadoAnterior = $record->estado_actual;
                        $record->update([
                            'trabajador_id' => $data['trabajador_id'],
                            'estado_actual' => 'TRABAJADOR_ASIGNADO',
                        ]);

                        // Registrar en historial
                        HistorialEstadoOrden::create([
                            'id' => (string) Str::uuid(),
                            'orden_id' => $record->id,
                            'estado_anterior' => $estadoAnterior,
                            'estado_nuevo' => 'TRABAJADOR_ASIGNADO',
                            'cambiado_por_usuario_id' => auth()->id(),
                            'comentario' => 'Designado manualmente por la empresa proveedora de limpieza',
                            'creado_at' => now(),
                        ]);

                        Notification::make()
                            ->title('Trabajador asignado con éxito')
                            ->body("La orden {$record->codigo_seguimiento} ahora tiene personal asignado.")
                            ->success()
                            ->send();
                    }),

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
