package models

import "gorm.io/gorm"

type Car struct {
	gorm.Model
	ID        int     `json:"id"`
	Brand     string  `json:"brand"`
	CarModel  string  `json:"model"`
	Year      int     `json:"year"`
	Price     float64 `json:"price"`
	Available bool    `json:"available"`
}
