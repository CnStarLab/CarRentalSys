package models

import "gorm.io/gorm"

type FavoriteCars struct {
	gorm.Model
	CarID  uint `json:"carId"`
	UserId uint `json:"userId"`
}
