package controller

import (
	"carRentalSys/database"
	"carRentalSys/models"
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func AddCarsByUser(c *gin.Context) {
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

func GetAllCars(c *gin.Context) {
	var cars []models.Car
	result := database.DB.Find(&cars)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, cars)
}

func GetCarById(c *gin.Context) {
	idParam := c.Param("id")
	carID, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid car ID"})
		return
	}

	var existingCarInfo models.Car
	if err := existingCarInfo.FindByID(database.DB, carID); err != nil {
		if errors.Is(err, models.ErrCarNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, existingCarInfo)
}
