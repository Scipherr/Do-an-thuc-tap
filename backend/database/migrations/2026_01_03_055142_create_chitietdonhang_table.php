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
    Schema::create('chitietdonhang', function (Blueprint $table) {
        $table->increments('ma_chi_tiet');
        
        // MUST BE unsignedInteger to match 'increments' in donhang
        $table->unsignedInteger('ma_don_hang');
        $table->foreign('ma_don_hang')->references('ma_don_hang')->on('donhang')->onDelete('cascade');
        
        $table->string('ma_san_pham', 20);
        $table->foreign('ma_san_pham')->references('ma_san_pham')->on('sanpham');

        $table->string('ten_san_pham');
        $table->string('hinh_anh')->nullable();
        $table->string('mau_sac', 50)->nullable();
        $table->string('dung_luong', 50)->nullable();
        $table->integer('so_luong');
        $table->decimal('gia', 10, 2);
        $table->decimal('thanh_tien', 15, 2)->storedAs('so_luong * gia');
        $table->decimal('tien_giam', 15, 2)->default(0);
        $table->integer('thoi_gian_bao_hanh')->default(12);
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chitietdonhang');
    }
};
