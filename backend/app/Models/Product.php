<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    
    protected $table = 'sanpham';
    
    protected $primaryKey = 'ma_san_pham';

    public $incrementing = false;
    protected $keyType = 'string';
    
    const CREATED_AT = 'ngay_tao';
    const UPDATED_AT = 'ngay_cap_nhat';

    protected $fillable = [
        'ma_danh_muc',
        'ten_san_pham',
        'slug',
        'mo_ta',
        'thuong_hieu',
        'gia',
        'gia_goc',
        'diem_danh_gia',
        'so_luot_danh_gia',
        'so_luong_ton',
        'trang_thai',
        'noi_bat',
        'hinh_anh',
        'anh_chi_tiet',
        'thong_so_ky_thuat',
        'ma_khuyen_mai',
    ];

    protected $casts = [
        'anh_chi_tiet' => 'array',
        'thong_so_ky_thuat' => 'array',
        'gia' => 'decimal:2',
        'gia_goc' => 'decimal:2',
        'diem_danh_gia' => 'decimal:1',
        'noi_bat' => 'boolean',
        'trang_thai' => 'boolean',
        'so_luong_ton' => 'integer',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'ma_danh_muc', 'ma_danh_muc');
    }

    public function discount()
    {
        return $this->belongsTo(Discount::class, 'ma_khuyen_mai', 'ma_khuyen_mai');
    }
}