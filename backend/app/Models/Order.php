<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'donhang';
    protected $primaryKey = 'ma_don_hang';
    const CREATED_AT = 'ngay_tao';
    const UPDATED_AT = null;

    protected $fillable = [
        'ma_nguoi_dung',
        'trang_thai',
        'tien_hang',
        'thue',
        'phi_van_chuyen',
        'tien_giam',
        'tong_tien',
        'phuong_thuc_tt',
        'da_thanh_toan',
        'ngay_thanh_toan',
        'da_giao_hang',
        'ngay_giao_hang',
        'duong_giao_hang',
        'thanh_pho_giao_hang',
        'quoc_gia_giao_hang',
        'ma_khuyen_mai',
    ];

    
    protected $casts = [
        'trang_thai' => 'integer',
        'da_thanh_toan' => 'boolean', 
        'da_giao_hang' => 'boolean',  
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'ma_nguoi_dung', 'ma_nguoi_dung');
    }

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class, 'ma_don_hang', 'ma_don_hang');
    }
}