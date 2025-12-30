<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;

    // Map to the specific table name
    protected $table = 'khuyenmai';

    // Custom Primary Key
    protected $primaryKey = 'ma_khuyen_mai';

    // Disable timestamps since the table doesn't have created_at/updated_at
    public $timestamps = false;

    protected $fillable = [
        'ma_code',
        'mo_ta',
        'phan_tram_giam',
        'giam_toi_da',
        'don_toi_thieu',
        'ngay_bat_dau',
        'ngay_ket_thuc',
        'dang_hoat_dong',
        'so_lan_dung',
    ];

    /**
     * Cast attributes to native types
     */
    protected $casts = [
        'phan_tram_giam' => 'float',
        'giam_toi_da'    => 'decimal:2',
        'don_toi_thieu'  => 'decimal:2',
        'dang_hoat_dong' => 'boolean', // 1 = true, 0 = false
        'ngay_bat_dau'   => 'datetime',
        'ngay_ket_thuc'  => 'datetime',
        'so_lan_dung'    => 'integer',
    ];

    /**
     * Check if the discount is valid for a specific order total
     */
    public function isValid($orderTotal = 0)
    {
        $now = now();

        if (!$this->dang_hoat_dong) {
            return false;
        }

        if ($now->lt($this->ngay_bat_dau) || $now->gt($this->ngay_ket_thuc)) {
            return false;
        }

        if ($orderTotal < $this->don_toi_thieu) {
            return false;
        }

        return true;
    }

    /**
     * Relationship: A discount can be applied to many Orders
     */
    public function orders()
    {
        return $this->hasMany(Order::class, 'ma_khuyen_mai', 'ma_khuyen_mai');
    }

    /**
     * Relationship: A discount might be linked to specific Products (if applicable)
     */
    public function products()
    {
        return $this->hasMany(Product::class, 'ma_khuyen_mai', 'ma_khuyen_mai');
    }
}