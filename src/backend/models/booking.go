package models

import (
	"errors"
	"fmt"
	"time"

	"gorm.io/gorm"
)

// =======================Structure for database mapping ==============================//
type UserCar struct {
	gorm.Model
	UserId    uint      `json:"UserId"`
	CarID     uint      `json:"carId"`
	StartTime time.Time `json:"startTime" gorm:"not null"`
	EndTime   time.Time `json:"endTime" gorm:"not null"`
	Status    uint8     `json:"status"`
	//0: Request     1:Pending for payment     2:Paid but not used
	//3.During using 4.After using             5.Finished
	Reason     string `json:"reason"`
	TotalPrice uint64 `json:"totalPrice"`
}

//=======================Structure for service==================================//

type Logs []UserCar

// struct for owner profile page status monitor and renting flow alert
type OwnerCarsInfo struct {
	Brand     string    `json:"brand"`
	CarModel  string    `json:"model"`
	CarType   string    `json:"cartype"`
	Year      int       `json:"year"`
	CarPics   []CarsPic `json:"carPics"`
	UsingLogs []UserCar `json:"useLogs"`
}

type CarsBookInfo []OwnerCarsInfo

var (
	ErrUserNotFound      = errors.New("user not found")
	ErrCarNotFound       = errors.New("car not found")
	ErrCarNotAvailable   = errors.New("car is not available")
	ErrUserCarNotFound   = errors.New("UserCar relation not found")
	ErrPreloadNotAllowed = errors.New("preload connection not found")
	ErrNoCarsMatch       = errors.New("no cars match with conditions")
)

func BookCar(db *gorm.DB, userId uint, carID uint, startTime time.Time, endTime time.Time, reason string) (uint, error) {
	var car Car
	if err := db.First(&car, carID).Error; err != nil {
		return 0, ErrCarNotFound
	}

	if !car.Available {
		return 0, ErrCarNotAvailable
	}

	// Create a new UserCar record
	fmt.Println(startTime)
	userCar := UserCar{
		UserId:    userId,
		CarID:     car.ID,
		StartTime: startTime,
		EndTime:   endTime,
		Reason:    reason,
		Status:    0,
	}
	if err := db.Create(&userCar).Error; err != nil {
		return 0, err
	}

	// Associate the user and car
	//db.Model(&user).Association("Cars").Append(&car)

	return userCar.ID, nil
}

func ReturnCar(db *gorm.DB, userId, carID uint) error {

	var car Car
	if err := db.First(&car, carID).Error; err != nil {
		return ErrCarNotFound
	}

	var userCar UserCar
	if err := db.Where("userId = ? AND car_id = ?", userId, carID).First(&userCar).Error; err != nil {
		return ErrUserCarNotFound
	}

	if err := db.Delete(&userCar).Error; err != nil {
		return err
	}

	return nil
}

func FindBookInfoByBookId(db *gorm.DB, bookId uint64) (UserCar, error) {
	var curr UserCar
	if err := db.Where("id = ?", bookId).First(&curr).Error; err != nil {
		return curr, ErrUserCarNotFound
	}
	return curr, nil
}

func (u *UserCar) UpdateStatus(db *gorm.DB, newStatus uint8) error {
	u.Status = newStatus
	if err := db.Save(&u).Error; err != nil {
		return err
	}
	return nil
}

func (uc *UserCar) Delete(db *gorm.DB) error {
	if err := db.Delete(&uc).Error; err != nil {
		return err
	}
	return nil
}
