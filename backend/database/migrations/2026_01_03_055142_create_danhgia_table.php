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
        Schema::create('danhgia', function (Blueprint $table) {
            $table->integer('ma_danh_gia')->autoIncrement();
            
            $table->string('ma_san_pham', 20);
            $table->foreign('ma_san_pham')->references('ma_san_pham')->on('sanpham')->onDelete('cascade');
            
            $table->integer('ma_nguoi_dung');
            $table->foreign('ma_nguoi_dung')->references('ma_nguoi_dung')->on('nguoidung');
            
            $table->integer('so_sao');
            $table->dateTime('ngay_tao')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('danhgia');
    }
};
