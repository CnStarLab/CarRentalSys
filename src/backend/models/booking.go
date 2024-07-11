package models

import (
	"errors"
	"time"

	"gorm.io/gorm"
)

type UserCar struct {
	UserID    uint      `json:"userId" gorm:"primaryKey"`
	CarID     uint      `json:"carId" gorm:"primaryKey"`
	StartTime time.Time `json:"startTime" gorm:"not null"`
	EndTime   time.Time `json:"endTime" gorm:"not null"`
}

var (
	ErrUserNotFound    = errors.New("user not found")
	ErrCarNotFound     = errors.New("car not found")
	ErrCarNotAvailable = errors.New("car is not available")
)

func BookCar(db *gorm.DB, userID uint, carID uint) error {
	var user User
	if err := db.Preload("Cars").First(&user, userID).Error; err != nil {
		return ErrUserNotFound
	}

	var car Car
	if err := db.First(&car, carID).Error; err != nil {
		return ErrCarNotFound
	}

	if !car.Available {
		return ErrCarNotAvailable
	}

	// 更新汽车状态为不可用
	car.Available = false
	db.Save(&car)

	// 添加用户和汽车的关联
	db.Model(&user).Association("Cars").Append(&car)

	return nil
}

func ReturnCar(db *gorm.DB, userID uint, carID uint) error {
	var user User
	if err := db.Preload("Cars").First(&user, userID).Error; err != nil {
		return ErrUserNotFound
	}

	var car Car
	if err := db.First(&car, carID).Error; err != nil {
		return ErrCarNotFound
	}

	// 更新汽车状态为可用
	car.Available = true
	db.Save(&car)

	// 删除用户和汽车的关联
	db.Model(&user).Association("Cars").Delete(&car)

	return nil
}
