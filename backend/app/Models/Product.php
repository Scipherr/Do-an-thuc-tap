<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'sanpham';
    protected $primaryKey = 'ma_san_pham';
    const CREATED_AT = 'ngay_tao';
    const UPDATED_AT = 'ngay_cap_nhat';

    protected $fillable = [
        'ma_danh_muc',
        'ten_san_pham',
        'mo_ta',
        'thuong_hieu',
        'gia',
        'diem_danh_gia',
        'so_luot_danh_gia',
        'so_luong_ton',
        'hinh_anh',
        'ma_khuyen_mai',
    ];

    // Optional: Relationship with Category (Danhmuc)
    // Assuming you have or will create a Category model
    public function category()
    {
        return $this->belongsTo(Category::class, 'ma_danh_muc', 'ma_danh_muc');
    }
}