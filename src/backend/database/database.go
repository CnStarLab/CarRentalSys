package database

import (
	"carRentalSys/models"
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	dsn := "host=localhost user=test dbname=testing password=513513 port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	DB = db

	// 自动迁移数据库模型
	err = db.AutoMigrate(
		&models.User{},
		&models.Car{},
		&models.UserCar{},
		&models.Comment2Car{},
		&models.Comment2User{},
		&models.FavoriteCars{},
	)

	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	fmt.Println("Database connection established")
}
