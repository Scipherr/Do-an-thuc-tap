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
    Schema::create('donhang', function (Blueprint $table) {
        // 'increments' creates an UNSIGNED Integer Primary Key
        $table->increments('ma_don_hang');
        
        $table->integer('ma_nguoi_dung');
        $table->foreign('ma_nguoi_dung')->references('ma_nguoi_dung')->on('nguoidung');
        
        // ... rest of your columns ...
        $table->integer('ma_khuyen_mai')->nullable();
        $table->tinyInteger('trang_thai')->default(0);
        $table->decimal('tien_hang', 20, 2);      
        $table->decimal('thue', 20, 2);           
        $table->decimal('phi_van_chuyen', 20, 2);
        $table->decimal('tien_giam', 20, 2)->default(0); 
        $table->decimal('tong_tien', 20, 2);
        $table->string('phuong_thuc_tt', 50)->nullable();
        $table->boolean('da_thanh_toan')->default(false);
        $table->dateTime('ngay_thanh_toan')->nullable();
        $table->boolean('da_giao_hang')->default(false);
        $table->dateTime('ngay_giao_hang')->nullable();
        $table->string('duong_giao_hang')->nullable();
        $table->string('thanh_pho_giao_hang', 100)->nullable();
        $table->string('quoc_gia_giao_hang', 100)->nullable();
        $table->dateTime('ngay_tao')->useCurrent();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donhang');
    }
};
