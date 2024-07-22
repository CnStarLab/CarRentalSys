package models

import "gorm.io/gorm"

type Car struct {
	gorm.Model
	Brand           string `json:"brand"`
	CarModel        string `json:"model"`
	CarType         string `json:"carType"`
	BasicInfo       string `json:"basicInfo"`
	FeatureInfo     string `json:"featureInfo"`
	Location        string `json:"location"`
	SupportDriver   bool   `json:"supportDriver"`
	SupportDelivery bool   `json:"supportDelivery"`
	OwnerId         uint   `json:"ownerId"`
	Seats           uint8  `json:"numSeats"`

	Year         int           `json:"year"`
	Price        float64       `json:"price"`
	Rating       float64       `json:"rating"`
	Available    bool          `json:"available"`
	Comments2Car []Comment2Car `json:"comments2car"`
	CarPics      []CarsPic     `json:"carPics" gorm:"foreignKey:CarId"`
}

type Comment2Car struct {
	gorm.Model
	BookId       uint             `json:"bookId"`
	UserId       uint             `json:"userId"`
	CarId        uint             `json:"carId" gorm:"primaryKey"`
	TitleContent string           `json:"titleContent"`
	MainContent  string           `json:"mainContent"`
	Likes        uint             `json:"likes"`
	PicNames     []Comment2CarPic `json:"photos" gorm:"foreignKey:Comment2CarID"`
}

type Comment2CarPic struct {
	gorm.Model
	FileName      string `json:"fileName"`
	Comment2CarID uint   `json:"comment2CarId"`
}

type CarsPic struct {
	gorm.Model
	FileName string `json:"fileName"`
	CarId    uint   `json:"carId"`
}

func CreateCarByUser(db *gorm.DB, car *Car) error {
	return db.Create(car).Error
}
