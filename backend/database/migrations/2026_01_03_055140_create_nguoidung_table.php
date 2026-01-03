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
        Schema::create('nguoidung', function (Blueprint $table) {
            $table->integer('ma_nguoi_dung')->autoIncrement();
            $table->string('ho_ten');
            $table->string('email')->unique();
            
            // Fixed: Added this because UserFactory tries to fill it
            $table->timestamp('email_verified_at')->nullable(); 
            
            $table->string('mat_khau');
            $table->string('vai_tro', 20)->default('customer');
            $table->string('duong')->nullable();
            $table->string('thanh_pho', 100)->nullable();
            $table->string('tinh_thanh', 100)->nullable();
            $table->string('hinh_anh')->nullable();
            $table->string('so_dien_thoai', 20)->nullable()->after('email');
            $table->date('ngay_sinh')->nullable()->after('hinh_anh');
            $table->string('gioi_tinh', 10)->nullable()->after('ngay_sinh');
            
            
            // Fixed: Added this because Laravel Auth expects it for "remember me" functionality
            $table->rememberToken(); 
            
            // Custom timestamps matching your SQL
            $table->dateTime('ngay_tao')->useCurrent();
            $table->dateTime('ngay_cap_nhat')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nguoidung');
    }
};