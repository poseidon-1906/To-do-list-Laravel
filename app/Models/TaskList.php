<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory; // Ajoutez cette ligne si vous utilisez les factories

class TaskList extends Model
{
    use HasFactory; // Ajoutez cette ligne si vous utilisez les factories

    protected $table = 'lists'; // Spécifie le nom de la table si ce n'est pas la convention par défaut (task_lists)

    protected $fillable = [
        'title',
        'description',
        'user_id'
    ];

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    public function user(): BelongsTo
    {
        // Correction ici : 'BelongsTo' avec une majuscule est incorrect.
        // C'est '$this->belongsTo(...)' avec un 'b' minuscule.
        return $this->belongsTo(User::class);
    }
}
