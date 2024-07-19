package models

import "gorm.io/gorm"

type Comment2Car struct {
	gorm.Model
	BookId  uint   `json:"bookId"`
	UserId  uint   `json:"userId"`
	CarId   uint   `json:"carId" gorm:"primaryKe"`
	Content string `json:"content"`
}
