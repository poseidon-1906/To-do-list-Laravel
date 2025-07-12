<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Tasks;
use Illuminate\Database\Eloquent\Factories\HasFactory; // Ajoutez cette ligne si vous utilisez les factories

class Tasks extends Model
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
        
        return $this->belongsTo(TaskList::class, 'list_id');
    }
}