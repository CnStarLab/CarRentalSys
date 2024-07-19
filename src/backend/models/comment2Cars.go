package models

import "gorm.io/gorm"

type Comment2Car struct {
	gorm.Model
	BookId       uint   `json:"bookId"`
	UserId       uint   `json:"userId"`
	CarId        uint   `json:"carId" gorm:"primaryKe"`
	TitleContent string `json:"titleContent"`
	MainContent  string `json:"mainContent"`
	Likes        uint   `json:"likes"`
}
