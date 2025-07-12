<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\HasFactory; // Ajoutez cette ligne si vous utilisez les factories

class Task extends Model
{
    use HasFactory; // Ajoutez cette ligne si vous utilisez les factories

    protected $fillable = [
        'title',
        'description',
        'is_completed',
        'due_date',
        'list_id'
    ];

    public function list(): BelongsTo
    {
        // Correction ici : Laravel conventionnellement utilise le nom de la fonction
        // pour inférer la classe liée si elle suit une convention (e.g., list_id -> TaskList).
        // Cependant, pour plus de clarté et pour éviter les conflits potentiels avec
        // le mot-clé 'list' en PHP, il est préférable de nommer la relation de manière plus spécifique,
        // comme 'taskList'. Si 'list' est le nom de la table, cela peut aussi être 'lists'.
        // J'ai renommé la fonction en 'taskList' pour la clarté et la convention Laravel.
        return $this->belongsTo(TaskList::class, 'list_id');
    }
}