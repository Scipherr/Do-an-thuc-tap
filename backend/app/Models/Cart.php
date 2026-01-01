<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $table = 'giohang';
    protected $primaryKey = 'ma_gio_hang';
    
  
    const CREATED_AT = 'ngay_tao';
    const UPDATED_AT = 'ngay_cap_nhat';

    protected $fillable = [
        'ma_nguoi_dung',
        'ma_san_pham',
        'so_luong',
    ];

   
    protected $with = ['product'];
    protected $appends = ['id', 'product_qty'];

    public function getIdAttribute()
    {
        return $this->ma_gio_hang;
    }

    public function getProductQtyAttribute()
    {
        return $this->so_luong;
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'ma_san_pham', 'ma_san_pham');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'ma_nguoi_dung', 'ma_nguoi_dung');
    }
}