package models

import (
	"errors"
	"fmt"
	"time"

	"gorm.io/gorm"
)

type UserCar struct {
	gorm.Model
	Username  string    `json:"username" gorm:"primaryKe"`
	CarID     uint      `json:"carId" gorm:"primaryKey"`
	StartTime time.Time `json:"startTime" gorm:"not null"`
	EndTime   time.Time `json:"endTime" gorm:"not null"`
	Status    uint8     `json:"status"`
	//0: Request     1:Pending for payment     2:Paid but not used
	//3.During using 4.After using             5.Finished
	Reason     string `json:"reason"`
	TotalPrice uint64 `json:"totalPrice"`
}

var (
	ErrUserNotFound      = errors.New("user not found")
	ErrCarNotFound       = errors.New("car not found")
	ErrCarNotAvailable   = errors.New("car is not available")
	ErrUserCarNotFound   = errors.New("UserCar relation not found")
	ErrPreloadNotAllowed = errors.New("preload connection not found")
)

func BookCar(db *gorm.DB, username string, carID uint, startTime time.Time, endTime time.Time) error {
	var car Car
	if err := db.First(&car, carID).Error; err != nil {
		return ErrCarNotFound
	}

	if !car.Available {
		return ErrCarNotAvailable
	}

	// Update car status to unavailable
	car.Available = false
	db.Save(&car)

	// Create a new UserCar record
	fmt.Println(startTime)
	userCar := UserCar{
		Username:  username,
		CarID:     car.ID,
		StartTime: startTime,
		EndTime:   endTime,
	}
	if err := db.Create(&userCar).Error; err != nil {
		return err
	}

	// Associate the user and car
	//db.Model(&user).Association("Cars").Append(&car)

	return nil
}

func ReturnCar(db *gorm.DB, username string, carID uint) error {
	// 查找用户和汽车

	var car Car
	if err := db.First(&car, carID).Error; err != nil {
		return ErrCarNotFound
	}

	// 在 UserCars 中找到对应的记录并删除
	var userCar UserCar
	if err := db.Where("username = ? AND car_id = ?", username, carID).First(&userCar).Error; err != nil {
		return ErrUserCarNotFound
	}

	// 更新汽车状态为可用
	car.Available = true
	db.Save(&car)

	// 删除 UserCar 记录
	if err := db.Delete(&userCar).Error; err != nil {
		return err
	}

	return nil
}
