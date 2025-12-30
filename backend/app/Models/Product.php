<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    
    // Explicitly define the table name since it doesn't follow the plural convention 'products'
    protected $table = 'sanpham';
    
    // Define the custom primary key
    protected $primaryKey = 'ma_san_pham';
    
    // Map Laravel's default timestamps to your custom column names
    const CREATED_AT = 'ngay_tao';
    const UPDATED_AT = 'ngay_cap_nhat';

    protected $fillable = [
        'ma_danh_muc',
        'ten_san_pham',
        'slug',              // New: SEO URL
        'mo_ta',
        'thuong_hieu',
        'gia',
        'gia_goc',           // New: Original price for strike-through
        'diem_danh_gia',
        'so_luot_danh_gia',
        'so_luong_ton',
        'trang_thai',        // New: Status (Active/Hidden)
        'noi_bat',           // New: Featured flag
        'hinh_anh',
        'anh_chi_tiet',      // New: JSON Gallery
        'thong_so_ky_thuat', // New: JSON Specs
        'ma_khuyen_mai',
    ];

    /**
     * The attributes that should be cast.
     * This automatically converts JSON columns to PHP Arrays and formatting numbers.
     */
    protected $casts = [
        'anh_chi_tiet' => 'array',      // Auto-decode JSON to Array
        'thong_so_ky_thuat' => 'array', // Auto-decode JSON to Array
        'gia' => 'decimal:2',
        'gia_goc' => 'decimal:2',
        'diem_danh_gia' => 'decimal:1',
        'noi_bat' => 'boolean',         // 1/0 becomes true/false
        'trang_thai' => 'boolean',      // 1/0 becomes true/false
        'so_luong_ton' => 'integer',
    ];

    // Relationship with Category (Danhmuc)
    public function category()
    {
        return $this->belongsTo(Category::class, 'ma_danh_muc', 'ma_danh_muc');
    }

    // Optional: Relationship with Discounts (Khuyenmai)
    public function discount()
    {
        return $this->belongsTo(Discount::class, 'ma_khuyen_mai', 'ma_khuyen_mai');
    }
}