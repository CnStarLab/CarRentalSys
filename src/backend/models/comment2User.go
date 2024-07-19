package models

import "gorm.io/gorm"

type Comment2User struct {
	gorm.Model
	BookId       uint   `json:"bookId"`
	UserId       uint   `json:"userId" gorm:"primaryKe"`
	CarId        uint   `json:"carId"`
	TitleContent string `json:"titileContent"`
	MainContent  string `json:"mainContent"`
	Likes        uint   `json:"likes"`
}
