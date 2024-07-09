package controller

import (
	"carRentalSys/database"
	"carRentalSys/models"
	"net/http"

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
	c.JSON(200, gin.H{
		"message": "ALL CARS",
	})
	//WIP
}
