package controller

import (
	"carRentalSys/database"
	"carRentalSys/models"
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func BookNewCar(c *gin.Context) {
	var rentRequest models.UserCar
	if err := c.ShouldBindJSON(&rentRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	id, err := models.BookCar(database.DB, rentRequest.UserId, rentRequest.CarID, rentRequest.StartTime, rentRequest.EndTime, rentRequest.Reason)
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

	c.JSON(http.StatusOK, gin.H{"message": "Car rented successfully", "bookId": id})
}

func ReturnCar(c *gin.Context) {
	var returnRequest models.UserCar
	if err := c.ShouldBindJSON(&returnRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := models.ReturnCar(database.DB, returnRequest.UserId, returnRequest.CarID)
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

func ApproveBookRequest(c *gin.Context) {
	idParam := c.Param("id")
	requestId, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid car ID"})
		return
	}

	//get book info
	var currRequest models.UserCar
	currRequest, err = models.FindBookingInfoById(database.DB, requestId)
	if err != nil {
		if errors.Is(err, models.ErrUserCarNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if currRequest.Status != 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Not A Pending Request!"})
		return
	}

	// do update status
	if err := currRequest.UpdateStatus(database.DB, 1); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Request approved successfully"})
}

func GetBookInfoById(c *gin.Context) {
	idParam := c.Param("id")
	requestId, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid car ID"})
		return
	}

	//get book info
	var currBookInfo models.UserCar
	currBookInfo, err = models.FindBookingInfoById(database.DB, requestId)
	if err != nil {
		if errors.Is(err, models.ErrUserCarNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, currBookInfo)
}
