package controller

import (
	"carRentalSys/database"
	"carRentalSys/models"
	"errors"
	"net/http"
	"strconv"

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
