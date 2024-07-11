package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Username string `json:"username" gorm:"unique;not null"`
	Email    string `json:"email" gorm:"unique;not null"`
	Password string `json:"password" gorm:"not null"`
	Cars     []Car  `gorm:"many2many:user_cars;" json:"cars"`
}

func CreateUser(db *gorm.DB, user *User) error {
	return db.Create(user).Error
}
