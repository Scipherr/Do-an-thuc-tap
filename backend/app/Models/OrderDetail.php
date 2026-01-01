<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;

    // Map to the 'chitietdonhang' table
    protected $table = 'chitietdonhang';

    // Define the primary key
    protected $primaryKey = 'ma_chi_tiet';

    // Disable timestamps since the table doesn't have 'ngay_tao' or 'ngay_cap_nhat'
    public $timestamps = false;

    protected $fillable = [
        'ma_don_hang',
        'ma_san_pham',
        'ten_san_pham',
        'so_luong',
        'gia',
    ];

    // Relationship: Belongs to an Order
    public function order()
    {
        return $this->belongsTo(Order::class, 'ma_don_hang', 'ma_don_hang');
    }

    // Relationship: Belongs to a Product
    public function product()
    {
        return $this->belongsTo(Product::class, 'ma_san_pham', 'ma_san_pham');
    }
}