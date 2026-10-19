<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContactMessage extends Model
{
    public const STATUSES = ['new', 'read', 'replied', 'archived'];

    protected $fillable = ['name', 'email', 'phone', 'service_id', 'budget', 'message', 'status', 'locale'];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
