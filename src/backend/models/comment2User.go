package models

import "gorm.io/gorm"

type Comment2User struct {
	gorm.Model
	BookId  uint   `json:"bookId"`
	UserId  uint   `json:"userId" gorm:"primaryKe"`
	CarId   uint   `json:"carId"`
	Content string `json:"content"`
}
