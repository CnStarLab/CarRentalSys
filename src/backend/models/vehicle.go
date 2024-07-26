package models

import (
	"time"

	"gorm.io/gorm"
)

// ===========================Database Table Mapping Structure==============================//
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
	UsingLogs    []UserCar     `json:"useLogs" gorm:"foreignKey:CarID"`
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

//===========================Service Inner Structure===================================//

type Cars []Car

type CarQueryParams struct {
	MinPrice        int64
	MaxPrice        int64
	Brand           string
	Location        string
	CarType         string
	SupportDriver   string
	SupportDelivery string
	StartTime       time.Time
	EndTime         time.Time
}

// ==========================function for type==========================================//
func CreateCarByUser(db *gorm.DB, car *Car) error {
	return db.Create(car).Error
}

func (c *Car) FindByCarID(db *gorm.DB, ID uint64) error {
	if err := db.Preload("CarPics").Preload("UsingLogs").First(&c, ID).Error; err != nil {
		if err == gorm.ErrPreloadNotAllowed {
			return ErrPreloadNotAllowed
		}
	}

	if err := db.Where("id = ?", ID).First(c).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return ErrCarNotFound
		}
		return err
	}
	return nil
}

func (c *Cars) FindByOwnerID(db *gorm.DB, ownerId uint64) error {
	if err := db.Preload("CarPics").Where("owner_id = ?", ownerId).Find(c).Error; err != nil {
		if err == gorm.ErrPreloadNotAllowed {
			return ErrPreloadNotAllowed
		}
		if err == gorm.ErrRecordNotFound {
			return ErrCarNotFound
		}
		return err
	}
	return nil
}

// func (c *Car) IsTimeSlotAvailable(startTime, endTime time.Time) bool {
// 	for _, log := range c.UsingLogs {
// 		if (startTime.Before(log.EndTime) && endTime.After(log.StartTime)) ||
// 			(startTime.Equal(log.StartTime) && endTime.Equal(log.EndTime)) {
// 			return false
// 		}
// 	}
// 	return true
// }

func (c *Cars) FindByConds(db *gorm.DB, param *CarQueryParams) error {
	query := db.Model(&Car{}).Preload("CarPics")

	if param.MinPrice > 0 && param.MaxPrice > 0 {
		query = query.Where("price >= ? AND price <= ?", param.MinPrice, param.MaxPrice)
	}

	if param.Brand != "" {
		query = query.Where("brand = ?", param.Brand)
	}

	if param.Location != "" {
		query = query.Where("location = ?", param.Location)
	}

	if param.CarType != "" {
		query = query.Where("car_type = ?", param.CarType)
	}

	if param.SupportDriver != "" {
		query = query.Where("support_driver = ?", param.SupportDriver)
	}

	if param.SupportDelivery != "" {
		query = query.Where("support_delivery = ?", param.SupportDelivery)
	}

	// Execute the query and load the results into `c`
	if err := query.Find(&c).Error; err != nil {
		return err
	}

	// Check if any cars match the basic conditions
	if len(*c) == 0 {
		return ErrNoCarsMatch
	}

	// Filter by availability if start and end times are provided
	if !param.StartTime.IsZero() && !param.EndTime.IsZero() {
		availableCars := make(Cars, 0, len(*c))

		for _, car := range *c {
			err := db.Preload("UsingLogs").Find(&car).Error
			if err != nil {
				return err
			}

			available := true
			for _, log := range car.UsingLogs {
				if (param.StartTime.Before(log.EndTime) && param.EndTime.After(log.StartTime)) ||
					(param.StartTime.Equal(log.StartTime) && param.EndTime.Equal(log.EndTime)) {
					available = false
					break
				}
			}

			if available {
				availableCars = append(availableCars, car)
			}
		}

		*c = availableCars

		// Check if any cars are available in the given time frame
		if len(*c) == 0 {
			return ErrNoCarsMatch
		}
	}

	return nil
}
