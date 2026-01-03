<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('giohang', function (Blueprint $table) {
            $table->integer('ma_gio_hang')->autoIncrement();
            
            $table->integer('ma_nguoi_dung');
            $table->foreign('ma_nguoi_dung')->references('ma_nguoi_dung')->on('nguoidung')->onDelete('cascade');
            
            $table->string('ma_san_pham', 20);
            $table->foreign('ma_san_pham')->references('ma_san_pham')->on('sanpham')->onDelete('cascade');
            
            $table->integer('so_luong')->default(1);
            
            $table->unique(['ma_nguoi_dung', 'ma_san_pham'], 'unique_cart_item');
            
            $table->dateTime('ngay_tao')->useCurrent();
            $table->dateTime('ngay_cap_nhat')->useCurrent()->useCurrentOnUpdate();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('giohang');
    }
};
