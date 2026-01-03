<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
   public function up()
{
    // Change table name from 'users' to 'nguoidung'
    Schema::create('nguoidung', function (Blueprint $table) {
        $table->id('ma_nguoi_dung'); // Primary key
        $table->string('ho_ten');    // Was 'name'
        $table->string('email')->unique();
        $table->timestamp('email_verified_at')->nullable();
        $table->string('mat_khau');  // Was 'password'
        $table->string('vai_tro')->default('customer');
        $table->string('hinh_anh')->nullable();
        $table->string('duong')->nullable();
        $table->string('thanh_pho')->nullable();
        $table->string('tinh_thanh')->nullable();
        $table->rememberToken();
        
        // Custom timestamps to match Model constants
        $table->timestamp('ngay_tao')->useCurrent();
        $table->timestamp('ngay_cap_nhat')->useCurrent()->useCurrentOnUpdate();
    });
}

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
