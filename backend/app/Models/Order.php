<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    // Map to the 'donhang' table
    protected $table = 'donhang';

    // Define the primary key
    protected $primaryKey = 'ma_don_hang';

    // Map created_at to 'ngay_tao'
    const CREATED_AT = 'ngay_tao';
    
    // Disable updated_at since the column doesn't exist in the 'donhang' table
    const UPDATED_AT = null;

    protected $fillable = [
        'ma_nguoi_dung',
        'trang_thai',       // e.g., 'Pending', 'Completed'
        'tien_hang',
        'thue',
        'phi_van_chuyen',
        'tien_giam',
        'tong_tien',
        'phuong_thuc_tt',   // Payment method
        'da_thanh_toan',    // Boolean (tinyint)
        'ngay_thanh_toan',
        'da_giao_hang',
        'ngay_giao_hang',
        'duong_giao_hang',
        'thanh_pho_giao_hang',
        'quoc_gia_giao_hang',
        'ma_khuyen_mai',
    ];

    // Relationship: An order belongs to a User (NguoiDung)
    public function user()
    {
        return $this->belongsTo(User::class, 'ma_nguoi_dung', 'ma_nguoi_dung');
    }

    // Relationship: An order has many Order Details (ChiTietDonHang)
    // You will need a OrderDetail model for this to work fully
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class, 'ma_don_hang', 'ma_don_hang');
    }
}