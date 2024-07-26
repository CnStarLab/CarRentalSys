package controller

import (
	"carRentalSys/database"
	"carRentalSys/models"
	"errors"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func CreateCarsByUser(c *gin.Context) {
	var car models.Car

	// Bind JSON string to struct.
	if err := c.ShouldBindJSON(&car); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create cars in models.
	if err := models.CreateCarByUser(database.DB, &car); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, car)
}

func UpdateCarInfo(c *gin.Context) {
	var updateCar models.Car
	// Bind request with json
	if err := c.ShouldBindJSON(&updateCar); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get User Id and change to uint64
	idParam := c.Param("id")
	carID, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid car ID"})
		return
	}

	// Search existing Car
	var existingCar models.Car
	if err := existingCar.FindByCarID(database.DB, carID); err != nil {
		if errors.Is(err, models.ErrCarNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// update
	existingCar.CarPics = updateCar.CarPics

	if err := database.DB.Save(&existingCar).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, existingCar)
}

func GetAllCars(c *gin.Context) {
	var cars []models.Car
	result := database.DB.Preload("CarPics").Find(&cars)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, cars)
}

func GetCarByCarId(c *gin.Context) {
	idParam := c.Param("id")
	carID, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid car ID"})
		return
	}

	var existingCarInfo models.Car
	if err := existingCarInfo.FindByCarID(database.DB, carID); err != nil {
		if errors.Is(err, models.ErrCarNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, existingCarInfo)
}

func GetCarByOwnerId(c *gin.Context) {
	idParam := c.Param("id")
	ownerID, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Owner ID"})
		return
	}

	var existingCarsInfo models.Cars
	if err := existingCarsInfo.FindByOwnerID(database.DB, ownerID); err != nil {
		if errors.Is(err, models.ErrCarNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, existingCarsInfo)
}

func GetCarsWithConds(c *gin.Context) {
	var currParams models.CarQueryParams

	minPrice, err := strconv.ParseInt(c.Query("minPrice"), 10, 64)
	if err == nil {
		currParams.MinPrice = minPrice
	}

	maxPrice, err := strconv.ParseInt(c.Query("maxPrice"), 10, 64)
	if err == nil {
		currParams.MaxPrice = maxPrice
	}

	currParams.Brand = c.Query("brand")
	currParams.Location = c.Query("location")
	currParams.CarType = c.Query("carType")
	currParams.SupportDriver = c.Query("supportDriver")
	currParams.SupportDelivery = c.Query("supportDelivery")

	if st := c.Query("startTime"); st != "" {
		startTime, err := time.Parse(time.RFC3339, st)
		if err == nil {
			currParams.StartTime = startTime
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid start date format"})
			return
		}
	}

	if et := c.Query("endTime"); et != "" {
		endTime, err := time.Parse(time.RFC3339, et)
		if err == nil {
			currParams.EndTime = endTime
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid start date format"})
			return
		}
	}

	var resultCars models.Cars
	if err := resultCars.FindByConds(database.DB, &currParams); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, resultCars)
}

func GetCarInvalidDate(c *gin.Context) {
	//get parama and trans 2 unsigned int
	idParam := c.Param("id")
	carID, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Car ID"})
		return
	}

	//Search the car by carId
	var targetCar models.Car
	if err := targetCar.FindByCarID(database.DB, carID); err != nil {
		if errors.Is(err, models.ErrCarNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//Put the member we want into new structure
	var result []map[string]interface{}
	for _, userCar := range targetCar.UsingLogs {
		result = append(result, map[string]interface{}{
			"id":        userCar.ID,
			"startTime": userCar.StartTime,
			"endTime":   userCar.EndTime,
		})
	}

	c.JSON(http.StatusOK, result)
}
