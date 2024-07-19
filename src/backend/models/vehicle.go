package models

import "gorm.io/gorm"

type Car struct {
	gorm.Model
	Brand           string `json:"brand"`
	CarModel        string `json:"model"`
	CarType         string `json:"type"`
	Location        string `json:"location"`
	SupportDriver   bool   `json:"supportDriver"`
	SupportDelivery bool   `json:"supportDelivery"`
	OwnerId         uint   `json:"userId"`
	Seats           uint8  `json:"numSeats"`

	Year         int           `json:"year"`
	Price        float64       `json:"price"`
	Available    bool          `json:"available"`
	Comments2Car []Comment2Car `json:"comments2car"`
}

func CreateCarByUser(db *gorm.DB, car *Car) error {
	return db.Create(car).Error
}
