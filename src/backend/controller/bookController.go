package controller

import (
	"carRentalSys/database"
	"carRentalSys/models"
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/copier"
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
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Book ID"})
		return
	}

	//get book info
	var currRequest models.UserCar
	currRequest, err = models.FindBookInfoByBookId(database.DB, requestId)
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

	//[WIP] email/sms service notice user
	c.JSON(http.StatusOK, gin.H{"message": "Request approved successfully"})
}

func DeclineBookRequest(c *gin.Context) {
	idParam := c.Param("id")
	requestId, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Book ID"})
		return
	}

	// Get book info
	var currRequest models.UserCar
	currRequest, err = models.FindBookInfoByBookId(database.DB, requestId)
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

	// Delete the request from the database
	if err := currRequest.Delete(database.DB); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//[WIP] email/sms service notice user
	c.JSON(http.StatusOK, gin.H{"message": "Request declined and deleted successfully"})
}

func GetBookInfoByBookId(c *gin.Context) {
	idParam := c.Param("id")
	requestId, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid car ID"})
		return
	}

	//get book info
	var currBookInfo models.UserCar
	currBookInfo, err = models.FindBookInfoByBookId(database.DB, requestId)
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

func GetBookInfoByOwnerId(c *gin.Context) {
	var ownerCarsInfo models.CarsBookInfo
	idParam := c.Param("id")
	OwnerId, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Owner ID"})
		return
	}

	var myCars models.Cars
	err = myCars.FindByOwnerID(database.DB, OwnerId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch cars"})
		return
	}
	//emprty slice
	if len(myCars) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "You Have No Car Registered For Renting Yet!"})
		return
	}

	copier.Copy(&ownerCarsInfo, &myCars)

	c.JSON(http.StatusOK, ownerCarsInfo)
}
