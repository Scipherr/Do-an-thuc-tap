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
        Schema::create('sanpham', function (Blueprint $table) {
            $table->string('ma_san_pham', 20)->primary();
            
            // Foreign Keys
            $table->integer('ma_danh_muc')->nullable();
            $table->foreign('ma_danh_muc')->references('ma_danh_muc')->on('danhmuc')->onDelete('set null');
            
            $table->integer('ma_khuyen_mai')->nullable();
            $table->foreign('ma_khuyen_mai')->references('ma_khuyen_mai')->on('khuyenmai')->onDelete('set null');

            $table->string('ten_san_pham');
            $table->string('slug')->unique();
            $table->text('mo_ta')->nullable();
            $table->string('thuong_hieu', 100)->nullable();
            $table->decimal('gia', 15, 2)->default(0);
            $table->decimal('gia_goc', 15, 2)->nullable();
            $table->decimal('diem_danh_gia', 3, 1)->default(5.0);
            $table->integer('so_luot_danh_gia')->default(0);
            $table->integer('so_luong_ton')->default(0);
            $table->string('hinh_anh')->nullable();
            $table->longText('anh_chi_tiet')->nullable(); // JSON
            $table->longText('thong_so_ky_thuat')->nullable(); // JSON

            // Generated Column (MySQL 5.7+)
            $table->boolean('noi_bat')->virtualAs('diem_danh_gia >= 4.5');

            $table->dateTime('ngay_tao')->useCurrent();
            $table->dateTime('ngay_cap_nhat')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sanpham');
    }
};
