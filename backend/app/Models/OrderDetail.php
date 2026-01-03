<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;

    protected $table = 'chitietdonhang';
    protected $primaryKey = 'ma_chi_tiet';
    public $timestamps = false;

    
    protected $fillable = [
        'ma_don_hang',
        'ma_san_pham',
        'ten_san_pham',
        'hinh_anh',           
        'so_luong',
        'gia',
        'tien_giam',
        'thoi_gian_bao_hanh'  
    ];

    public function order()
    {
        return $this->belongsTo(Order::class, 'ma_don_hang', 'ma_don_hang');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'ma_san_pham', 'ma_san_pham');
    }
}