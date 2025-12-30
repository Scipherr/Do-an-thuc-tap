<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $table = 'danhmuc';
    protected $primaryKey = 'ma_danh_muc';
    public $timestamps = false;

    protected $fillable = [
        'ten_danh_muc',
        'mo_ta',
    ];

  
    public function products()
    {
        return $this->hasMany(Product::class, 'ma_danh_muc', 'ma_danh_muc');
    }
}