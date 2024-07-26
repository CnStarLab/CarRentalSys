package controller

import (
	"carRentalSys/database"
	"carRentalSys/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func BookNewCar(c *gin.Context) {
	var rentRequest models.UserCar
	if err := c.ShouldBindJSON(&rentRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := models.BookCar(database.DB, rentRequest.Username, rentRequest.CarID, rentRequest.StartTime, rentRequest.EndTime, rentRequest.Reason)
	if err != nil {
		switch err {
		case models.ErrUserNotFound:
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		case models.ErrCarNotFound:
			c.JSON(http.StatusNotFound, gin.H{"error": "Car not found"})
		case models.ErrCarNotAvailable:
			c.JSON(http.StatusBadRequest, gin.H{"error": "Car is not available"})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Car rented successfully"})
}

func ReturnCar(c *gin.Context) {
	var returnRequest models.UserCar
	if err := c.ShouldBindJSON(&returnRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := models.ReturnCar(database.DB, returnRequest.Username, returnRequest.CarID)
	if err != nil {
		switch err {
		case models.ErrUserNotFound:
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		case models.ErrCarNotFound:
			c.JSON(http.StatusNotFound, gin.H{"error": "Car not found"})
		case models.ErrUserCarNotFound:
			c.JSON(http.StatusBadRequest, gin.H{"error": "Realation between User and Car not found"})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Car rented successfully"})
}
