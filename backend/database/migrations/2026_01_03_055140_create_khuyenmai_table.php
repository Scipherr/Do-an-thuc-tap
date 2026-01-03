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
        Schema::create('khuyenmai', function (Blueprint $table) {
            $table->integer('ma_khuyen_mai')->autoIncrement();
            $table->string('ma_code', 50)->unique();
            $table->text('mo_ta')->nullable();
            $table->decimal('phan_tram_giam', 5, 2);
            $table->decimal('giam_toi_da', 10, 2)->nullable();
            $table->decimal('don_toi_thieu', 10, 2)->default(0);
            $table->dateTime('ngay_bat_dau');
            $table->dateTime('ngay_ket_thuc');
            $table->boolean('dang_hoat_dong')->default(true);
            $table->integer('so_lan_dung')->default(0);
            $table->timestamps(); // creates created_at, updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('khuyenmai');
    }
};
