package controller

import (
	"carRentalSys/database"
	"carRentalSys/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func BookNewCar(c *gin.Context) {
	var rentRequest models.UserCar
	fmt.Println("!11")
	if err := c.ShouldBindJSON(&rentRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := models.BookCar(database.DB, rentRequest.UserID, rentRequest.CarID)
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
