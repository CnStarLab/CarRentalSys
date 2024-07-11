package models

import "gorm.io/gorm"

type Car struct {
	gorm.Model
	Brand     string  `json:"brand"`
	CarModel  string  `json:"model"`
	Year      int     `json:"year"`
	Price     float64 `json:"price"`
	Available bool    `json:"available"`
	Users     []User  `gorm:"many2many:user_cars;" json:"users"`
}

func CreateCarByUser(db *gorm.DB, car *Car) error {
	return db.Create(car).Error
}
