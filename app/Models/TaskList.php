<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Tasks; // <-- C'EST CETTE LIGNE QUI EST CRUCIALE ICI

class TaskList extends Model
{
    use HasFactory;

    protected $table = 'lists';
    protected $fillable = [
        'title',
        'description',
        'user_id'
    ];

    public function tasks(): HasMany
    {
        return $this->hasMany(Tasks::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}