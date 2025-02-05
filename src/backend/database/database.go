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
	dsn := "host=db user=test dbname=testing password=513513 port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	DB = db

	// Auto-migration database structure
	err = db.AutoMigrate(
		&models.User{},
		&models.Car{},
		&models.UserCar{},
		&models.Comment2Car{},
		&models.Comment2User{},
		&models.FavoriteCars{},
		&models.Comment2CarPic{},
		&models.Comment2UserPic{},
		&models.CarsPic{},
	)

	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	fmt.Println("Database connection established")
}
