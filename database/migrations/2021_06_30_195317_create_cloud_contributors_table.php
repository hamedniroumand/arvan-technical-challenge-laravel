<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCloudContributorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cloud_contributors', function (Blueprint $table) {
            $table->id();
            $table->string("fullname");
            $table->string("mobile", 15);
            $table->string("email");
            $table->string("company")->nullable();
            $table->string("resume");
            $table->string("portfolio")->nullable();
            $table->string("contributors_type")->nullable()->comment("{1: کوچ ابری}, {2: فنی}, {3: بازارچه}, {4: آموزش}, {5: فروش}");
            $table->string("contributors_level")->nullable()->comment("{1: سطح 1}, {2: سطح 2}, {3: سطح 3}, {4: سطح 4}");
            $table->text("description")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cloud_contributors');
    }
}
