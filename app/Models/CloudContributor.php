<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CloudContributor extends Model
{
    use HasFactory;

    protected $fillable = [
        "fullname",
        "mobile",
        "email",
        "company",
        "resume",
        "portfolio",
        "contributors_type",
        "contributors_level",
        "description",
    ];
}
